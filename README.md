奈良高専情報工学科　情報工学特論

８班で使用する（予定）の環境
# クラス
## `Environment`
環境を表す
### フィールド
#### `rooms`
部屋の一覧

部屋割りがどうなってるかを確認できるが，強化学習における「状態」ではない。（状態は`getState`メソッドで取得する）
### メソッド
#### `constructor`
環境を作成する
- `people`：部屋割りで割り当てられる人の一覧
- `w`：同室希望の人が同室にいたときに加算される幸福度
- `d`：同室拒否の人が同室にいたときに加算される幸福度
- `s`：同室希望でもなく同室拒否でもない人が同室にいたときに加算される幸福度
- `a`：attended roomsの数
- `m`：movable peopleの人数
- `evaluate`：評価関数，各人の幸福度を`number[]`で受け取って`number`を返す
#### `getState`
環境の状態を取得する
#### `receive`
環境に対して行動を行う（環境から見れば行動を「受ける」）
#### `getEvaluationValue`
評価関数の値を取得できる

学習度合いの確認などにどうぞ
## `ImpressionStat`
１人の人に対し，その人を「同室希望」「同室拒否」とした人が何人いるかを１つの部屋で集計したもの

`Environment`の`getState()`は状態として`ImpressionStat[]`型の戻り値を返す
### フィールド
#### `likeCount`
集計対象の部屋でその人を「同室希望」とした人の人数
#### `dislikeCount`
集計対象の部屋でその人を「同室拒否」とした人の人数
### メソッド
#### `constructor`
インスタンスの生成を行う

普通にプログラミングしてればエージェント側で使うことは無いはず
## `Action`
環境がエージェントから受け取る行動を表す
### フィールド
#### `memberIndex1`・`memberIndex2`
制約は以下の２つのみ
- 正の整数である
- 行動を受け取る`Environment`型インスタンスの初期化時に渡した引数`m`・`a`を用いて$ m \times a $で計算される整数以下である

普通にプログラミングしてれば，エージェント側ではインスタンス生成時以外アクセスしないはず
### メソッド
#### `constructor`
`memberIndex1`・`memberIndex2`を引数の通りとした`Action`型インスタンスを生成する
## `Room`
部屋を表す

部屋割りがどうなってるか確認するときにしかアクセスしないと思う
### フィールド
#### `members`
部屋のメンバー一覧
### メソッド
#### `constructor`
`Room`型インスタンスを初期化する

普通にプログラミングしてればエージェント側で使うことは無いはず
## `Person`
人を表す
### フィールド
#### `name`
名前
#### `likedPeople`
その人が「同室希望」としている人の一覧

普通にプログラミングしてれば`likes`メソッドを経由せずアクセスすることは無いはず
#### `dislikedPeople`
その人が「同室拒否」としている人の一覧

普通にプログラミングしてれば`dislikes`メソッドを経由せずアクセスすることは無いはず
### メソッド
#### `constructor`
`Person`型インスタンスを生成する

`name`には引数で指定した文字列が入るが，`likedPeople`・`dislikedPeople`はインスタンス生成後にそのインスタンスの`likes`・`dislikes`メソッドで設定する
#### `likes`
その人が「同室希望」としている人を設定する（`likedPeople`に人を追加する）
#### `dislikes`
その人が「同室拒否」としている人を設定する（`dislikedPeople`に人を追加する）
### 使用例
```ts
import { People } from "https://raw.githubusercontent.com/takechan-NITNC/room-allocation-reinforcement-learning-environment/v0.0.0/person.ts"
const sato = new People("佐藤");
const suzuki = new People("鈴木");
const tanaka = new People("田中");
sato.dislikes(tanaka);
suzuki.likes(sato, tanaka);
tanaka.likes(sato);
tanaka.dislikes(suzuki);
```