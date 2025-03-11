const http = require("http");
const fs = require("fs");
const path = require("path");

const WebFile = require("./functions/webfile");

/**
 *
 * @param {http.ClientRequest} req
 * @param {http.ServerResponse} res
 */

if (req.method === "GET" && req.url === "/course-certificate") {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    fs.readFileSync(path.join(__dirname, "views", "course-certificate.html"))
  );
  res.end();
  return;
}

if (req.method === "GET" && req.url === "/invoice") {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(fs.readFileSync(path.join(__dirname, "views", "invoice.html")));
  res.end();
  return;
}

function app(req, res) {
  if (req.method === "GET" && !req.url.startsWith("/api")) {
    const fileReq = new WebFile(req.url);
    const filePath = path.join(__dirname, "views", fileReq.filename);

    if (
      req.url.startsWith("/css/") ||
      req.url.startsWith("/js/") ||
      req.url.startsWith("/images/")
    ) {
      const filePathStatic = path.join(__dirname, req.url);
      if (fs.existsSync(filePathStatic)) {
        const ext = path.extname(filePathStatic);
        const contentType =
          ext === ".css"
            ? "text/css"
            : ext === ".js"
            ? "application/javascript"
            : ext === ".jpg" || ext === ".jpeg"
            ? "image/jpeg"
            : ext === ".png"
            ? "image/png"
            : "text/plain";

        res.writeHead(200, { "Content-Type": contentType });
        res.write(fs.readFileSync(filePathStatic));
        res.end();
        return;
      }
    }

    const contentType =
      fs.existsSync(filePath) && fileReq.getExtension()
        ? fileReq.getMimeType()
        : "text/html";
    res.writeHead(200, { "Content-Type": contentType });

    let filePathToUse = path.join(__dirname, "views/404.html");

    if (fs.existsSync(filePath) && fileReq.getExtension()) {
      filePathToUse = filePath;
    } else if (!fileReq.getExtension()) {
      const checkIndex = path.join(filePath, "index.html");
      const checkHtml = filePath + ".html";
      if (fs.existsSync(checkIndex)) filePathToUse = checkIndex;
      else if (fs.existsSync(checkHtml)) filePathToUse = checkHtml;
    }

    res.write(fs.readFileSync(filePathToUse));
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        msg: "Success",
        path: req.url,
        method: req.method,
      })
    );
  }

  res.end();
}

const server = http.createServer(app);

const port = process.env.PORT || 5445;

server.listen(port);

console.log(`Server Running: http://localhost:${port}`);
