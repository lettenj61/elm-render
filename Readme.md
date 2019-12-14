# elm-render

See what Elm renders.


## Requirements

* Elm compiler
* Node.js


## Installation / Usage

```sh
$ elm-render [--elm-binary=/path/to/your/elm] <..sources>
```

Example:

```sh
$ cat Hello.elm
module Hello exposing (..)

import Html

main =
  Html.text "Hello, world!"

$ npm init -y
$ npm install elm-render --save
$ npx elm-render Hello.elm
# Hello, world!
```
