name := """ccli0709"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs
)

// https://mvnrepository.com/artifact/com.google.guava/guava
libraryDependencies += "com.google.guava" % "guava" % "19.0"

// https://mvnrepository.com/artifact/org.postgresql/postgresql
libraryDependencies += "org.postgresql" % "postgresql" % "9.4-1201-jdbc41"

// https://mvnrepository.com/artifact/com.restfb/restfb
libraryDependencies += "com.restfb" % "restfb" % "1.30.0"

// https://mvnrepository.com/artifact/net.glxn/qrgen
libraryDependencies += "net.glxn" % "qrgen" % "1.4"

// ===== JASPERREPORT =====
libraryDependencies += "com.lowagie" % "itext" % "2.1.7"
libraryDependencies += "net.sf.jasperreports" % "jasperreports" % "6.1.1"
resolvers += "jasperreports" at "http://jaspersoft.artifactoryonline.com/jaspersoft/third-party-ce-artifacts/"
// ===== JASPERREPORT(END) =====