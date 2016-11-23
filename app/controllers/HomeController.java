package controllers;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import com.avaje.ebean.PagedList;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import net.glxn.qrgen.QRCode;

import models.Member;
import models.Role;
import models.Task;
import models.rest.ViewState;
import play.Logger;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Http.Context;

/**
 * This controller contains an action to handle HTTP requests to the
 * application's home page.
 */
public class HomeController extends Controller {

	public Result logout() {

		session().clear();

		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("你已經登出");
		return ok(views.html.index.render(viewState));
	}

	public Result index() {

		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("這是首頁");
		return ok(views.html.index.render(viewState));
	}

	public Result getTask(Long id) {

		Map<String, Object> result = Maps.newHashMap();
		//
		// Task task = Task.find.byId(id);

		Member member = Member.find.byId((long) 1);

		// 使用EBEAN關聯的資料表無法轉成JSON
		List<String> roles = Lists.newArrayList();
		for (Role role : member.getRoles()) {
			roles.add(String.format("[%s]%s", role.getName(), role.getDescription()));
		}

		result.put("member", roles);
		// result.put("task", task);
		result.put("severity", "Info");
		result.put("message", "工作資料查詢完成。");

		return ok(Json.toJson(result));
	}

	public Result getTasks() {

		models.rest.Pagination pagination = new models.rest.Pagination(request());

		PagedList<Task> pagedList = Task.getPagedList(pagination);
		pagination.setTotalItems(pagedList.getTotalRowCount());

		Map<String, Object> result = Maps.newHashMap();

		// List<Task> tasks = Task.find.all();

		result.put("pagination", pagination);
		result.put("tasks", pagedList.getList());
		result.put("message", "工作資料查詢完成。");
		result.put("isSuccess", true);

		return ok(Json.toJson(result));
	}

	@BodyParser.Of(BodyParser.Json.class)
	public Result createTask() {

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode json = request().body().asJson();

		// models.rest.Customer input = new models.rest.Customer();
		Task input = new Task();

		try {
			input = objectMapper.readValue(json.get("task").toString(), Task.class);
		} catch (Exception e) {
			Logger.error(e.getMessage());
		}

		input.setId(null);
		input.save();

		Map<String, Object> result = Maps.newHashMap();
		result.put("task", input);
		result.put("message", "工作資料新增完成。");
		result.put("isSuccess", true);

		return ok(Json.toJson(result));
	}

	@BodyParser.Of(BodyParser.Json.class)
	public Result updateTask(Long id) {

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode json = request().body().asJson();

		// 由JSON轉換成物件時參考下列網址來忽略多餘的欄位
		// http://stackoverflow.com/questions/5455014/ignoring-new-fields-on-json-objects-using-jackson

		// models.rest.Customer input = new models.rest.Customer();
		Task input = new Task();
		try {
			input = objectMapper.readValue(json.get("task").toString(), Task.class);
		} catch (Exception e) {
			Logger.error(e.getMessage());
		}

		Task task = Task.find.byId(id);

		if (!Strings.isNullOrEmpty(input.getName())) {
			task.setName(input.getName());
		}
		if (input.isDone() != null) {
			task.setDone(input.isDone());
		}
		task.save();

		Map<String, Object> result = Maps.newHashMap();
		result.put("task", task);
		result.put("message", "工作資料修改完成。");
		result.put("isSuccess", true);

		return ok(Json.toJson(result));
	}

	public Result deleteTask(Long id) {

		Task task = Task.find.byId(id);
		task.delete();

		Map<String, Object> result = Maps.newHashMap();
		result.put("task", task);
		result.put("message", "工作資料刪 除完成。");
		result.put("isSuccess", true);

		return ok(Json.toJson(result));
	}

	public Result utilPng() {
		// 產生四位驗證碼
		StringBuffer sb = new StringBuffer(4);
		for (int i = 0; i < 10; i++) {
			int n = (int) (Math.random() * 10);
			sb.append(n);
		}
		String validateCode = sb.toString();

		// 創建緩存圖片
		BufferedImage image = new BufferedImage(640, 480, BufferedImage.TYPE_INT_RGB);
		Graphics2D g2d = (Graphics2D) image.getGraphics();
		g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

		// aptitude install fonts-wqy-microhei fonts-wqy-zenhei
		Font font = new Font("微軟正黑體", Font.PLAIN, 36);
		g2d.setFont(font);
		FontMetrics fontMetrics = g2d.getFontMetrics();

		g2d.setColor(Color.LIGHT_GRAY);
		g2d.fillRect(0, 0, 640, 480);
		g2d.setColor(Color.BLACK);
		g2d.drawString(validateCode, 10, 60);
		g2d.drawString("坔峯中文罕字測試", 10, 120);

		g2d.dispose();

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			ImageIO.write(image, "png", baos);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		InputStream is = new ByteArrayInputStream(baos.toByteArray());

		return ok(is).as("image/png");
	}

	public Result utilQrcode() {
		// get QR stream from text using defaults
		ByteArrayOutputStream baos = QRCode.from("https://csc-code.slack.com").stream();
		InputStream is = new ByteArrayInputStream(baos.toByteArray());

		return ok(is).as("image/png");
	}

}
