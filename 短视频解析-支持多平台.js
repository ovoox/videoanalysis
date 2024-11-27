import common from '../../lib/common/common.js';
import fetch from "node-fetch";
//作者：知鱼-3260478121-25204733
//博客：http://ocoa.cn（靓仔靓女望关顾）
//QQ群：861646887（进来瞧瞧？）
//GitHub：https://github.com/ovoox
//（里面有实用的js）
//————视频解析+链接————
//🤩🤩🤩视频支持：抖音|快手|小红书|皮皮虾|西瓜最右|火山|微博|微视|绿洲|bilbil陌陌|全民视频|全民k歌|逗拍|美拍六间房视频|梨视频|虎牙|新片场|AcFun🥳🥳🥳
export class VideoParser extends plugin {
    constructor() {
        super({
            name: "视频解析",
            description: "解析视频链接并返回视频",
            event: "message",
            priority: 0,
            rule: [
                {
  
                    reg: /^(#|\/)?视频解析.*$/,
                    fnc: "parseVideo",
                },
            ],
        });
    }

    async parseVideo(e) {

        const urlRegex = /https?:\/\/\S+/g;
        const allText = e.msg;
        const matches = allText.match(urlRegex);
        if (matches && matches.length > 0) {
            for (const matchedUrl of matches) {
                const videoUrl = `https://www.hhlqilongzhu.cn/api/sp_jx/sp.php?url=${encodeURIComponent(matchedUrl)}`;

                try {
                    const response = await fetch(videoUrl);
                    const data = await response.json();

                    if (!data || !data.data) {
                        await e.reply("视频解析失败 请检查链接是否正确");
                        return;
                    }
                    if (data.code === 200 && data.data && data.data.url) {
                        const url = data.data.url; 
                        await e.reply(segment.video(url)); 
                    } else {
                        await e.reply("解析错误惹 请检查API接口是否有响应");
                    }
                } catch (error) {
                    await e.reply("解析中断 请重试");
                }
            }
        } else {
            await e.reply("没有检测到链接哦");
        }
    }
}
