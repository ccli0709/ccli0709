package controllers.rest;

import java.util.List;
import java.util.Map;

import com.avaje.ebean.PagedList;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import models.Member;
import models.Task;
import play.Logger;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;

/**
 * This controller contains an action to handle HTTP requests to the
 * application's home page.
 */
public class MemberController extends Controller {

	public Result index() {

		models.rest.Pagination pagination = new models.rest.Pagination(request());

		PagedList<models.Member> pagedList = models.Member.getPagedList(pagination);
		pagination.setTotalItems(pagedList.getTotalRowCount());

		List<models.rest.Member> items = Lists.newArrayList();
		for (models.Member member : pagedList.getList()) {
			items.add(new models.rest.Member(member));
		}

		Map<String, Object> result = Maps.newHashMap();
		result.put("items", items);
		result.put("pagination", pagination);
		result.put("severity", "Success");
		result.put("message", "資料查詢完成。");

		return ok(Json.toJson(result));
	}

	@BodyParser.Of(BodyParser.Json.class)
	public Result create() {

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode json = request().body().asJson();

		// models.rest.Customer input = new models.rest.Customer();
		models.rest.Member input = new models.rest.Member();

		try {
			input = objectMapper.readValue(json.get("member").toString(), models.rest.Member.class);
		} catch (Exception e) {
			Logger.error(e.getMessage());
		}

		models.Member member = new models.Member();

		Map<String, Object> result = Maps.newHashMap();

		result.put("severity", "Success");
		result.put("message", "資料查詢完成。");
		return ok(Json.toJson(result));
	}

	@BodyParser.Of(BodyParser.Json.class)
	public Result store() {

		Map<String, Object> result = Maps.newHashMap();

		result.put("severity", "Success");
		result.put("message", "工作資料查詢完成。");

		return ok(Json.toJson(result));
	}

	public Result show(Long id) {

		Map<String, Object> result = Maps.newHashMap();

		result.put("severity", "Success");
		result.put("message", "工作資料查詢完成。");

		return ok(Json.toJson(result));
	}

	public Result edit(Long id) {

		Map<String, Object> result = Maps.newHashMap();

		result.put("severity", "Success");
		result.put("message", "工作資料查詢完成。");

		return ok(Json.toJson(result));
	}

	@BodyParser.Of(BodyParser.Json.class)
	public Result update(Long id) {

		Map<String, Object> result = Maps.newHashMap();

		result.put("severity", "Success");
		result.put("message", "工作資料查詢完成。");

		return ok(Json.toJson(result));
	}

	public Result destroy(Long id) {

		Map<String, Object> result = Maps.newHashMap();

		result.put("severity", "Success");
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

}
