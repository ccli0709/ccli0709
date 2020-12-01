package controllers;

import models.rest.ViewState;
import play.mvc.Controller;
import play.mvc.Http.Context;
import play.mvc.Result;

/**
 * This controller contains an action to handle HTTP requests to the
 * application's home page.
 */
public class RwdController extends Controller {

	public Result rwd(String page) {

		ViewState viewState = Secured.getViewState(Context.current());

		// TODO:不知道如何由變數去指定VIEW的名稱

		if (page.equals("basic_01")) {
			viewState.setPageTitle("RWD重新學習_01");
			return ok(views.html.rwd.basic_01.render(viewState));
		} else if (page.equals("basic_02")) {
			viewState.setPageTitle("RWD重新學習_02");
			return ok(views.html.rwd.basic_02.render(viewState));
		} else {
			return ok(views.html.rwd.basic_01.render(viewState));
		}
	}

}