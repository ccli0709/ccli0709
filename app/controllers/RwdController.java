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

		if (page.equals("basic_01")) {
			viewState.setPageTitle("RWD重新學習_01");
			return ok(views.html.rwd.basic_01.render(viewState));
		} else {
			return ok(views.html.rwd.basic_01.render(viewState));
		}
	}

}