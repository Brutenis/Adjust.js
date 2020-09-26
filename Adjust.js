class Adjust {

  constructor() {
    this.version = "1.0.0";
    this.name = `${this.constructor.name}.js`;
    console.info(`This site is running version ${this.version} of ${this.name}!`);
  }

  warn(error, name) {
    let message = "";

    switch (error) {
      case "classNotFound":
        message = `${this.name}: The DOM doesn't seem to have elements with a class name of "${name}"`;
        break;
      
      case "noClassSet":
        message = `${this.name}: The "className" parameter is required when calling the "${name}" method!`;
        break;

      case "noParameters":
        message = `${this.name}: No parameters were set when calling the "${name}" method!`;
        break;

      case "notNumber":
        message = `${this.name}: The "${name}" parameter is not a number!`;
        break;
      
      case "typeNotFound":
        message = `${this.name}: The "type" parameter has to be ${name}!`;
    }

    console.warn(message);
  }

  equalizer(data) {
    if (data) {
      if (data.className) {
        if (document.getElementsByClassName(data.className)) {
          if (data.type && (data.type.toLowerCase() == "height" || data.type.toLowerCase() == "width")) {
            const elements = Array.from(document.getElementsByClassName(data.className));
            let max = 0;
  
            const minWidth = data.minWidth ? data.minWidth : 0;
            const maxWidth = data.maxWidth ? data.maxWidth : Number.MAX_VALUE;
  
            const execute = () => {
              max = 0;
              
              if (window.innerWidth >= minWidth && window.innerWidth <= maxWidth) {

                if (data.type == "height") {
                  elements.forEach(element => {
                    element.style.height = "auto";
                    if (element.clientHeight > max) {
                      max = element.clientHeight;
                    }
                  })

                  elements.forEach(element => {
                    element.style.height = `${max}px`;
                  })
                }
                
                if (data.type == "width") {
                  elements.forEach(element => {
                    element.style.width = "auto";
                    if (element.clientWidth > max) {
                      max = element.clientWidth;
                    }
                  })

                  elements.forEach(element => {
                    element.style.height = `${max}px`;
                  })
                }

              } else {

                if (data.type == "height") {
                  elements.forEach(element => {
                    element.style.height = "auto";
                  })
                }

                if (data.type == "width") {
                  elements.forEach(element => {
                    element.style.width = "auto";
                  })
                }

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
            this.warn("typeNotFound", `"width" or "height"`);
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