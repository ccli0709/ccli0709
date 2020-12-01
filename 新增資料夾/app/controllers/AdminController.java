package controllers;

import models.rest.ViewState;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import play.mvc.Http.Context;

public class AdminController extends Controller {

	@Security.Authenticated(Secured.class)
	public Result index() {
		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("目前以管理者身份登入");
		return ok(views.html.admin.index.render(viewState));
	}

}
