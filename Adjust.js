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
        message = `${this.name}: The DOM doesn't seem to have elements with a class name of "${name}"!`;
        break;
      
      case "noClassSet":
        message = `${this.name}: The selector parameters are required when calling the "${name}" method!`;
        break;

      case "noParameters":
        message = `${this.name}: No parameters were set when calling the "${name}" method!`;
        break;

      case "notNumber":
        message = `${this.name}: The "${name}" parameter is not a number!`;
        break;
      
      case "typeNotFound":
        message = `${this.name}: The "type" parameter has to be ${name}!`;
        break;

      case "sizeNotFound":
        message = `${this.name}: The "size" parameter has to be a number when calling the "${name}" method!`;
        break;

      case "notBool":
        message = `${this.name}: The ${name} parameter has to be true or false (boolean)!`;
        break;

      case "idNotFound":
        message = `${this.name}: The DOM doesn't seem to have an element with an ID of "${name}"`;
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
                    element.style.width = `${max}px`;
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

  fontSizer(data) {
    if (data) {
      if (data.containerClass) {
        if (document.getElementsByClassName(data.containerClass)[0]) {
          if (data.type && (data.type.toLowerCase() == "height" || data.type.toLowerCase() == "width")) {
            if (data.size && typeof data.size == "number") {
              const containers = Array.from(document.getElementsByClassName(data.containerClass));
              let childPresent = false;
              let rounded = false;
              let size = data.size / 1000;

              const minWidth = data.minWidth ? data.minWidth : 0;
              const maxWidth = data.maxWidth ? data.maxWidth : Number.MAX_VALUE;

              if (data.rounded) {
                if (typeof data.rounded == "boolean") {
                  rounded = true;
                } else {
                  rounded = false;
                  this.warn("notBool", "rounded");
                }
              }
    
              if (data.childClass) {
                if (document.getElementsByClassName(data.childClass)[0]) {
                  childPresent = true;
                } else {
                  this.warn("classNotFound", data.childClass);
                }
              } else {
                childPresent = false;
              }

              const execute = () => {
                if (window.innerWidth >= minWidth && window.innerWidth <= maxWidth) {
                  containers.forEach(container => {
                    let containerSize = 0;
  
                    if (data.type == "height") {
                      containerSize = container.clientHeight;
                    } else {
                      containerSize = container.clientWidth;
                    }
  
                    const calculatedFontSize = rounded ? Math.floor(containerSize * size) : containerSize * size;
                    
                    if (childPresent) {
                      
                      const children = Array.from(container.getElementsByClassName(data.childClass));
                      children.forEach(child => {
                        child.style.fontSize = `${calculatedFontSize}px`;
                      })
                    } else {
                      container.style.fontSize = `${calculatedFontSize}px`;
                    }
                  })
                } else {
                  containers.forEach(container => {
                    if (childPresent) {
                      
                      const children = Array.from(container.getElementsByClassName(data.childClass));
                      children.forEach(child => {
                        child.style.fontSize = "";
                      })
                    } else {
                      container.style.fontSize = "";
                    }
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
              this.warn("sizeNotFound", "fontSizer");
            }
          } else {
            this.warn("typeNotFound", `"width" or "height"`);
          }
        } else {
          this.warn("classNotFound", data.containerClass);
        }
      } else {
        this.warn("noClassSet", "fontSizer");
      }
    } else {
      this.warn("noParameters", "fontSizer");
    }
  }

  cloner(data) {
    if (data) {
      if (data.modelID && data.targetClass) {
        if (document.getElementById(data.modelID)) {
          if (document.getElementsByClassName(data.targetClass)[0]) {
            if (data.type && (data.type.toLowerCase() == "height" || data.type.toLowerCase() == "width")) {
              const model = document.getElementById(data.modelID);
              const target = Array.from(document.getElementsByClassName(data.targetClass));
  
              const minWidth = data.minWidth ? data.minWidth : 0;
              const maxWidth = data.maxWidth ? data.maxWidth : Number.MAX_VALUE;
  
              const execute = () => {
                if (window.innerWidth >= minWidth && window.innerWidth <= maxWidth) {
                  if (data.type == "height") {
                    const modelHeight = model.clientHeight;
                    target.forEach(element => {
                      element.style.height = `${modelHeight}px`;
                    })

                  } else {
                    const modelWidth = model.clientWidth;
                    target.forEach(element => {
                      element.style.width = `${modelWidth}px`;
                    })
                  }

                } else {
                  if (data.type == "height") {
                    target.forEach(element => {
                      element.style.height = "auto";
                    })

                  } else {
                    target.forEach(element => {
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
            this.warn("classNotFound", data.targetClass);
          }
        } else {
          this.warn("idNotFound", data.modelID);
        }
      } else {
        this.warn("noClassSet", "cloner");
      }
    } else {
      this.warn("noParameters", "cloner");
    }
  }
}