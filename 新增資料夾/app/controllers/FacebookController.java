package controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.joda.time.DateTime;

import com.avaje.ebean.Ebean;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.Version;
import com.restfb.scope.ExtendedPermissions;
import com.restfb.scope.ScopeBuilder;
import com.restfb.scope.UserDataPermissions;
import com.typesafe.config.ConfigFactory;

import models.Member;
import play.mvc.Controller;
import play.mvc.Result;

public class FacebookController extends Controller {

	String clientId = ConfigFactory.load().getString("facebook.clientId");
	String clientSecret = ConfigFactory.load().getString("facebook.clientSecret");
	String redirectUri = ConfigFactory.load().getString("facebook.redirectUri");

	public Result login() {

		ScopeBuilder scopeBuilder = new ScopeBuilder();

		scopeBuilder.addPermission(ExtendedPermissions.EMAIL);
		scopeBuilder.addPermission(UserDataPermissions.USER_FRIENDS);

		FacebookClient client = new DefaultFacebookClient(Version.VERSION_2_7);
		String loginDialogUrlString = client.getLoginDialogUrl(clientId, redirectUri, scopeBuilder);

		return redirect(loginDialogUrlString);
	}

	/**
	 * 臉書登入視窗完成後回呼的函式
	 * 
	 * @return
	 */
	public Result authenticate() {

		String code = request().getQueryString("code");

		String authUrl = String.format(
				"https://graph.facebook.com/oauth/access_token?client_id=%s&client_secret=%s&redirect_uri=%s&code=%s",
				clientId, clientSecret, redirectUri, code);

		String resp = getResponse(authUrl);
		String pattern = "access_token=(.*)&expires=(.*)";
		Pattern p = Pattern.compile(pattern);
		Matcher m = p.matcher(resp);

		String accessToken = "";
		String expires = "";

		while (m.find()) {
			accessToken = m.group(1);
			expires = m.group(2);
		}

		if (accessToken.length() == 0) {
			// TODO: 這裡想想如何做個統一的錯誤頁面
			return redirect(controllers.routes.HomeController.index());
		} else {
			FacebookClient fbClient = new DefaultFacebookClient(accessToken, Version.VERSION_2_7);
			com.restfb.types.User fbUser = fbClient.fetchObject("me", com.restfb.types.User.class,
					Parameter.with("fields", "email,name,gender"));

			List<Member> members = (List<Member>) Ebean.find(Member.class).where()
					.eq("facebookEmail", fbUser.getEmail()).findList();

			Member member = new Member();
			if (members.size() > 0) {
				member = members.get(0);
			} else {
				// 只在首次登入時寫入EMAIL和NAME
				member.setEmail(fbUser.getEmail());
				member.setName(fbUser.getName());
				member.setGender(fbUser.getGender());
				member.setCreateTime(new DateTime());
				member.setUpdateTime(new DateTime());
			}

			member.setFacebookEmail(fbUser.getEmail());
			member.setFacebookId(fbUser.getId());
			member.setFacebookName(fbUser.getName());
			member.setLastLoginTime(new DateTime());
			member.save();

			// session裡只用memberId來做登入記錄
			session().clear();
			session().put("memberId", member.getId().toString());

			return redirect(controllers.routes.HomeController.index());
		}
	}

	/**
	 * 僅用作臉書回呼時再送出取得ACCESS_TOKEN
	 * 
	 * @param url
	 * @return
	 */
	private String getResponse(String url) {
		StringBuilder sb = new StringBuilder();
		try {
			URL graphURL = new URL(url);
			HttpURLConnection conn = (HttpURLConnection) graphURL.openConnection();
			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = in.readLine();
			while (line != null) {
				sb.append(line);
				line = in.readLine();
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return sb.toString();
	}

}
