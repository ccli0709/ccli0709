package controllers;

import java.util.List;
import java.util.Map;

import com.avaje.ebean.PagedList;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Strings;
import com.google.common.collect.Maps;

import models.Member;
import models.Task;
import models.rest.ViewState;
import play.Logger;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Http.Context;
import play.mvc.Result;
import play.mvc.Security;

public class MemberController extends Controller {

	@Security.Authenticated(Secured.class)
	public Result list() {

		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("會員列表");
		return ok(views.html.member.list.render(viewState));
	}

	@Security.Authenticated(Secured.class)
	public Result profile() {

		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("個人資料維護");
		return ok(views.html.member.profile.render(viewState));
	}

}
