package controllers;

import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.google.common.collect.Lists;

import models.Member;
import models.Role;
import models.rest.ViewState;
import play.Logger;
import play.mvc.Http.Context;
import play.mvc.Result;
import play.mvc.Security;

public class Secured extends Security.Authenticator {

	public static ViewState getViewState(Context ctx) {
		String memberId = ctx.session().get("memberId");
		Member member = null;
		if (StringUtils.isNumeric(memberId)) {
			member = Member.find.byId(Long.parseLong(memberId));
		}

		ViewState viewState = new ViewState();
		if (member != null) {
			viewState.setMemberId(member.getId().toString());
			viewState.setMemberName(member.getName());
			viewState.setFacebookId(member.getFacebookId());
			viewState.setFacebookName(member.getFacebookName());

			member.getRoles().forEach(role -> viewState.getMemberRoles().add(role.getName()));
		}

		return viewState;
	}

	@Override
	public String getUsername(Context ctx) {

		// session裡面可以塞物件嗎?不然每次都再去資料庫裡抓群組好嗎?
		List<String> userGroups = Lists.newArrayList();
		userGroups.add("admin");
		userGroups.add("member");

		String memberId = ctx.session().get("memberId");
		Member member = null;
		if (StringUtils.isNumeric(memberId)) {
			member = Member.find.byId(Long.parseLong(memberId));
		}

		if (member != null) {

			String path = ctx.request().path();
			Logger.debug(String.format("*** member.getId(): %s", member.getId().toString()));
			Logger.debug(String.format("*** member.getName(): %s", member.getName()));
			Logger.debug(String.format("*** member.getEmail(): %s", member.getEmail()));
			Logger.debug(String.format("*** ctx.request().path(): %s", path));

			if (isRoleContains(member.getRoles(), "admin")) {
				return member.getEmail();
			} else if (path.startsWith("/maintain") && isRoleContains(member.getRoles(), "maintain")) {
				return member.getEmail();
			} else if (path.startsWith("/member")) {
				return member.getEmail();
			} else {
				return null;
			}
		} else {
			return null;
		}

	}

	private boolean isRoleContains(List<Role> roles, String memberRole) {
		boolean result = false;

		for (Role role : roles) {
			Logger.debug(String.format("*** role.getName(): %s", role.getName()));
			if (role.getName().equals(memberRole)) {
				result = true;
				break;
			}
		}

		return result;
	}

	@Override
	public Result onUnauthorized(Context ctx) {
		return redirect(controllers.routes.HomeController.index());
	}

}
