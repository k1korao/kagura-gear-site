# 更换全站背景音乐

播放器默认关闭，访客点击后才播放。所有封面共用同一个音乐配置。

1. 把用于网站播放的 MP3 或 M4A 文件上传到 `public/audio/`，例如 `background.mp3`。
2. 编辑 `public/audio/music.json`：`title` 是歌曲名称，`src` 填 `/audio/background.mp3` 或可以直接播放的 HTTPS 音频地址，`defaultVolume` 是 0 到 1 的初始音量。
3. 提交到 GitHub 的 main 分支，Vercel 会更新网站。

播放器不会在首次打开或刷新时自动出声。以后换歌只需修改上述配置和对应音频文件，不用改页面。

当前指定曲目：MONTAGEM PARA (Slowed)。尚未提供准确音频文件或播放地址，因此 src 保持为空；不会把其他同名作品或临时节奏当成指定曲目。
