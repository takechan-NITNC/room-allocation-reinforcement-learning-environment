export class ImpressionStat {
  readonly likeCount: number;
  readonly dislikeCount: number;
  constructor(likeCount: number, dislikeCount: number) {
    this.likeCount = likeCount;
    this.dislikeCount = dislikeCount;
  }
}
