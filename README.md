# eslint-plugin-vue-extras

Don&#39;t use &#34;this&#34; i a beforeRouteEnter method

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
yar add eslint eslint-plugin-vue --dev
```

Next, install `eslint-plugin-vue-extras`:

```
yarn add eslint-plugin-vue-extras --dev
```


## Usage

Add `eslint-vue-extra` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslint-vue-extras"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "vue-extras/no-this-in-before-route-enter": 2,
        "vue-extras/use-attribute-shortcut": 2
    }
}
```

## Supported Rules

### vue-extras/no-this-in-before-route-enter

Bad:
```vue
<script>
export default {
  beforeRouteEnter() {
    this.method()
  }
}
</script>
```

In a `beforeRouteEnter` method `this` is `undefined`. Details: [link](https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards)


### vue-extras/use-attribute-shortcut

Bad:

```vue
<template>
  <component :attr="true" />
</template>
```


Good:

```vue
<template>
  <component attr />
  <component attr="true" />
  <component :attr="false" />
</template>
```

Force attribute shortcut. Add `--fix` flag to apply shortcut.


