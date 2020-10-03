# Adjust.js

A JavaScript (ES6) library for small but impactful adjustments to push the boundaries of responsive web design.

To summarize, there are four functions with very specific tasks like:

 1. Equalize the width/height of a bunch of elements sharing a class
 2. Calculate element's font size relative to its container
 3. Copy the width/height from one element and apply to others
 4. Set element's height relative to its width (and vice versa)

The idea for this project was born from the need to  

# Usage

Firstly, we need to instantiate the Adjust class
```javascript
const adjust = new Adjust();
```

## Methods

### Method: equalizer

This method equalizes the width or height of elements sharing the same class name. It is extremely handy when you work with auto heights/widths and still want everything to align perfectly.

```javascript
adjust.equalizer({
  className: "your-class",
  type: "height",
  minWidth: 768,
  maxWidth: 1200
})
```

|Parameter|Purpose|Type|Required
|--|--|--|--|
|className|All elements of this class name will be affected|String|Yes
|type|Defines whether it's the width or height we're equalizing|String|Yes
|minWidth|Window sizes below this number will be ignored|Number|No
|maxWidth|Window sizes above this number will be ignored|Number|No



### Method: fontSizer

Do you sometimes want the font size to be relative to its container? Viewport units can achieve similar results however if the container size suddenly changes, you will need additional media queries to get this under control.

To make things easier, I've written a method that tracks the container measurements and calculates the font size for you:

```javascript
adjust.fontSizer({
  containerClass: "your-class",
  childClass: "child-class",
  type: "width",
  size: 50,
  rounded: false,
  minWidth: 768,
  maxWidth: 1200
})
```

|Parameter|Purpose|Type|Required
|--|--|--|--|
|containerClass|Elements for which font size is going to be set|String|Yes
|childClass|If set, elements of this class within the container will be affected|String|No
|type|Element's reference point for the relative font size to be set|String|Yes
|size|Relative unit describing the font size (1 unit is 1/1000th of the reference point)|Number|Yes
|rounded|If set to true, the applied font size will be set to the lowest bounding integer of the calculated one|Boolean|No
|minWidth|Window sizes below this number will be ignored|Number|No
|maxWidth|Window sizes above this number will be ignored|Number|No

### Method: cloner

This method simply takes the width or height from one element and applies it to other elements of the specified class. The functionality is similar to the "equalizer" method but this might be very handy in some specific cases.

```javascript
adjust.cloner({
  modelID: "your-id",
  targetClass: "your-class",
  type: "height",
  minWidth: 768,
  maxWidth: 1200
})
```
|Parameter|Purpose|Type|Required
|--|--|--|--|
|modelID|The ID of the element from which the measurements are going to be taken|String|Yes
|targetClass|The class name of the elements that the measurements are going to be applied to|String|Yes
|type|The measurement that's going to be used as the sample for other elements (width or height)|String|Yes
|minWidth|Window sizes below this number will be ignored|Number|No
|maxWidth|Window sizes above this number will be ignored|Number|No

### Method: stretcher

This method allows you to calculate element's width relative to its height (and vice versa). This is useful when your container has a dynamic width measured in percentage and you need to maintain the aspect ratio, even if the browser window is resized.

```javascript
adjust.stretcher({
  className: "your-class",
  percentage: 85,
  type: "height",
  minWidth: 768,
  maxWidth: 1200
})
```

|Parameter|Purpose|Type|Required
|--|--|--|--|
|className|The classs name of elements that are going to be affected|String|Yes
|percentage|By how much the element's width/height is going to be stretched (relatively to the measurement's counterpart). For example, to achieve the 16:9 aspect ratio, you'd choose the type of "height" and the percentage of 56.25|Number|Yes
|type|What measurement is going to be stretched relatively to its counterpart (width or height)|String|Yes
|minWidth|Window sizes below this number will be ignored|Number|No
|maxWidth|Window sizes above this number will be ignored|Number|No