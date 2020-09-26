class Adjust {
  constructor() {
    this.version = "1.0";
    this.name = `${this.constructor.name}.js`;
    console.info(`This site is running version ${this.version} of ${this.name}!`);
  }

  warn(error, name) {
    let message = "";

    switch (error) {
      case "classNotFound":
        message = `${this.name}: The DOM doesn't seem to have elements with a class name of "${name}`;
        break;
      
      case "noClassSet":
        message = `${this.name}: The "className" parameter is required when calling the "${name}" method!`;
        break;

      case "noParameters":
        message = `${this.name}: No parameters were set when calling the "${name}" method!`;
        break;

      case "notNumber":
        message = `${this.name}: The "${name}" parameter is not a number!`;
    }

    console.warn(message);
  }

  equalizeHeights(data) {
    if (data) {
      if (data.className) {
        if (document.getElementsByClassName(data.className)) {
          const elements = Array.from(document.getElementsByClassName(data.className));
          let height = 0;

          const minWidth = data.minWidth ? data.minWidth : 0;
          const maxWidth = data.maxWidth ? data.maxwidth : Number.MAX_VALUE;

          const execute = () => {
            if (window.innerWidth > minWidth && window.innerWidth < maxWidth) {
              elements.forEach(element => {
                element.style.height = "auto";

                if (element.clientHeight > height) {
                  height = element.clientHeight;
                }
              })

              elements.forEach(element => {
                element.style.height = height;
              })
            } else {
              elements.forEach(element => {
                element.style.height = "auto";
              })
            }
          }

          if (typeof minWidth != "number") {
            this.warn("notNumber", "minWidth");
          } else if (typeof maxWidth != "number") {
            this.warn("notNumber", "maxWidth");
          } else {
            window.addEventListener("load", execute);
            window.addEventListener("resize", execute);
          }

        } else {
          this.warn("classNotFound", data.className);
        }
      } else {
        this.warn("noClassSet", "equalizeHeights");
      }
    } else {
      this.warn("noParameters", "equalizeHeights");
    }
  }
}