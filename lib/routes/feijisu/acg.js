
const got = require('@/utils/got');
const cheerio = require("cheerio");

module.exports = async (ctx) => {
        const acgid = ctx.params.acgid;

        const destUrl = `http://www.feijisu5.com/acg/${acgid}/`;
        const response = await got({
                method: 'get',
                url: destUrl,
                headers: {
                        Referer: "http://www.feijisu5.com",
                        Connection: "keep-alive"
                }
        });

        const $ = cheerio.load(response.data);
        const tagas = $("#qiyi-pl-list li a")

        episodes = []
        for (var i = 0; i < tagas.length; i += 1) {
                episodes.push({title: tagas[i].attribs.title, link: `${destUrl}${tagas[i].attribs.href}`})
        }

        const cover = $(".lzimg").attr("data-img");
        const title = $(".title-left h1").text();

        ctx.state.data = {
                title: `飞极速番剧${title}更新`,
                link: destUrl,
                image: cover,
                item: episodes
        }
}