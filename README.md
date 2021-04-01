# eslint-plugin-vue-extras

Don&#39;t use &#34;this&#34; i a beforeRouteEnter method

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
yar add eslint eslint-plugin-vue --dev
```

Next, install `eslint-plugin-vue-extras`:

```
yarn add eslint-plugin-vue-extra --dev
```


## Usage

Add `eslint-vue-extra` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslint-vue-extra"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "eslint-plugin-vue-extra/no-this-in-before-route-enter": 2,
        "eslint-plugin-vue-extra/use-attribute-shortcut": 2
    }
}
```

## Supported Rules

* TODO: make some docs





