# eslint-plugin-vue-extras

Don&#39;t use &#34;this&#34; i a beforeRouteEnter method

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
npm i eslint --save-dev
```

Next, install `eslint-plugin-vue-extras`:

```
npm install eslint-plugin-vue-extra --save-dev
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
        "eslint-plugin-vue-extra/no-this-in-before-route-enter": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





