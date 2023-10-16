# Julia_set

[localhost](http://localhost:8080/julia)

## frontend

```
$ cd frontend
$ npm start
```

## backend

```
$ cd backend
$ npm start
```

## ジュリア集合

複素平面上のある反復関数が発散せずに安定する集合。

漸化式 $`Z_{n+1} = Z_n^2 + C`$ に於いて、Cを固定した場合に複素平面上の各点$`Z = Z_0`$に対し、それを初期値とする数列について|$`Z_n`$|が無限大に発散しない点の集合が充填ジュリア集合。

## 発散の判断方法

- |$`Z_n`$| > 2となる項が見つかった段階でその数列はいずれ無限大に発散する。
  - そこそこ大きな数（＝閾値）を設定し、計算しても$`Z_n`$が2を越えなければ無限大に発散しないとみなす。
- |C| > 2の場合、その時点で$`Z_n`$が発散するとも言えるため、|C|<=2の範囲のみ計算可能とする。

## 色について

- 数列が収束する場合は黒
- 収束しない点を他の色で表す。
  - 早さによって色を分ける。
