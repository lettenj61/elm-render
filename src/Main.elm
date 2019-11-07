module Main exposing (main)

import Html

main =
    let
        data =
            [1,2,3,4]

        answer =
            data
                |> List.map String.fromInt
                |> String.join "-"
    in
    Html.text answer
