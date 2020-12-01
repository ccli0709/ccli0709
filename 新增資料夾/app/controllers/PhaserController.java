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
public class PhaserController extends Controller {

	public Result phaser(String page) {

		ViewState viewState = Secured.getViewState(Context.current());

		if (page.equals("hello_world")) {
			viewState.setPageTitle("Hello, World!");
			return ok(views.html.phaser.hello_world.render(viewState));
		} else if (page.equals("first_sample")) {
			viewState.setPageTitle("官網的第一個練習");
			return ok(views.html.phaser.first_sample.render(viewState));
		} else if (page.equals("first_mobile")) {
			viewState.setPageTitle("手機遊戲製作練習");
			return ok(views.html.phaser.first_mobile.render(viewState));
		} else if (page.equals("first_game")) {
			viewState.setPageTitle("第一個練習遊戲");
			return ok(views.html.phaser.first_game.render(viewState));

		} else if (page.equals("animation_02")) {
			viewState.setPageTitle("使用OpenGameArt下載的角色動畫");
			return ok(views.html.phaser.animation_02.render(viewState));
		} else if (page.equals("tilemap_01")) {
			viewState.setPageTitle("使用Tiled製作的場景");
			return ok(views.html.phaser.tilemap_01.render(viewState));
		} else if (page.equals("camara_01")) {
			viewState.setPageTitle("Camara功能測試");
			return ok(views.html.phaser.camara_01.render(viewState));
		} else { // if (page.equals("animation_01"))
			viewState.setPageTitle("使用DranonBone匯出的角色動畫");
			return ok(views.html.phaser.animation_01.render(viewState));
		}
	}

	public Result spaceHipster() {
		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("Space Hipster");
		return ok(views.html.phaser.spaceHipster.render(viewState));
	}

	public Result topDown() {
		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("Top Down");
		return ok(views.html.phaser.topDown.render(viewState));
	}

	public Result platformer() {
		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("Platformer");
		return ok(views.html.phaser.platformer.render(viewState));
	}

}