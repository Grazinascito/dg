---
title: Write an addon
draft: false
tags:
  - "#learning"
  - frontend
  - storybook
  - react
date: 2024-11-30
---

---
## what?
* [x] how addons are structured?
* [x] how to publish my addon?

### how addons are structured?

There are two main categories of addons, each with its role:
- ✅ **UI-based**: These addons are responsible for customizing the interface, enabling shortcuts for common tasks, or displaying additional information in the UI. 
- **Presets**: [These](https://storybook.js.org/docs/addons/writing-presets) are pre-configured settings or configurations that enable developers to quickly set up and customize their environment with a specific set of features, functionality, or technology.

* [Understanding the build system](https://storybook.js.org/docs/addons/writing-addons#:~:text=project%20to%20JavaScript.-,Understanding%20the%20build%20system,-Addons%20built%20in)

> Addons can interact with Storybook in various ways. They can define presets to modify the configuration, add behavior to the manager UI, or add behavior to the preview iframe.

The `Tool` component is the entry point of the addon.

> Moving onto the manager, here we register the addon with Storybook using a unique name and identifier. Since we've removed the `Panel` and `Tab` files, we'll need to adjust the file to only reference the addon we're building.

[Tab addons](https://storybook.js.org/docs/addons/addon-types#:~:text=you%20can%20use.-,Tabs,-Tab%20addons%20allow) allow you to create your own custom tabs in Storybook.

src/manager.ts
```js
import { addons, types } from '@storybook/manager-api';
import { ADDON_ID, TOOL_ID } from './constants';
import { Tool } from './Tool';

// Register the addon
addons.register(ADDON_ID, () => {
	// Register the tool
	addons.add(TOOL_ID, {
	 type: types.TOOL,
	  title: 'My addon',
	   match: ({ tabId, viewMode }) => !tabId && viewMode === 'story',
		render: Tool,
	});
});
```

==`match` property==: 
	It allows you to control the view mode (story or docs) and tab (the story canvas or [custom tabs](https://storybook.js.org/docs/addons/addon-types#tabs))

examples: 
- `({ tabId }) => tabId === 'my-addon/tab'` will show your addon when viewing the tab with the ID `my-addon/tab`.
- `({ viewMode }) => viewMode === 'story'` will show your addon when viewing a story in the canvas.
- `({ viewMode }) => viewMode === 'docs'` will show your addon when viewing the documentation for a component.
- `({ tabId, viewMode }) => !tabId && viewMode === 'story'` will show your addon when viewing a story in the canvas and not in a custom tab (i.e. when `tabId === undefined`).


```js
import { ADDON_ID, PARAM_KEY, TOOL_ID } from './constants';
```

### setup addon-kit
* https://github.com/storybookjs/addon-kit

### Style the addon

> In Storybook, applying styles for addons is considered a side-effect.

> we'll need to make some changes to our addon to allow it to use the styles when it is active and remove them when it's disabled.

storybook's features to handle this:
* decorators:
	
* globals

> we must include some helper functions to inject and remove the stylesheets from the DOM.


src/helpers.ts
```js
import { global } from '@storybook/global';

export const clearStyles = (selector: string | string[]) => {
	const selectors = Array.isArray(selector) ? selector : [selector];
	selectors.forEach(clearStyle);
};

const clearStyle = (input: string | string[]) => {

const selector = typeof input === 'string' ? input : input.join('');

const element = global.document.getElementById(selector);

if (element && element.parentElement) {
	element.parentElement.removeChild(element);
	}
};

export const addOutlineStyles = (selector: string, css: string) => {

	const existingStyle = global.document.getElementById(selector);
	if (existingStyle) {
	if (existingStyle.innerHTML !== css) {
	existingStyle.innerHTML = css;
	}
	} else {
	const style = global.document.createElement('style');
	style.setAttribute('id', selector);
	style.innerHTML = css;
	global.document.head.appendChild(style);
	}
	
};
```

> we'll need to choose the correct selector for the DOM node where the styles will be injected and ensure the CSS is scoped to that particular selector
> 	[That mechanism is provided as an example within the `src/withGlobals.ts` file](https://storybook.js.org/docs/addons/writing-addons#:~:text=That%20mechanism%20is%20provided%20as%20an%20example%20within%20the%20src/withGlobals.ts%20file)

### Packaging and publishing

> Storybook addons, similar to most packages in the JavaScript ecosystem,

>they have specific criteria that need to be met to be published to NPM and crawled by the integration catalog:

1. Have a `dist` folder with the transpiled code.
2. A `package.json` file declaring:
    - Module-related information
    - Integration catalog metadata


