package controllers;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import models.Task;
import models.rest.ViewState;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.data.JRMapCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import play.Logger;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Http.Context;

/**
 * This controller contains an action to handle HTTP requests to the
 * application's home page.
 */
public class AngularJsController extends Controller {

	public Result index() {

		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("JASPERREPORT測試");
		return ok(views.html.angularjs.index.render(viewState));
	}

	public Result task() {
		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("待辦事項APP");
		return ok(views.html.angularjs.task.render(viewState));
	}

	public Result ngui() {
		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("ANGULARJS-UI");
		return ok(views.html.angularjs.ngui.render(viewState));
	}

	public Result ngtabs() {
		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("頁籤及訊息元件測試");
		return ok(views.html.angularjs.ngtabs.render(viewState));
	}

	public Result gantt() {
		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("甘特圖元件測試");
		return ok(views.html.angularjs.gantt.render(viewState));
	}

	public Result googlemap() {
		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("GoogleMap元件測試");
		return ok(views.html.angularjs.googlemap.render(viewState));
	}
}