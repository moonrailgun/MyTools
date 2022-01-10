export type RouteItem = [string, string];

interface Routes {
  [section: string]: RouteItem[];
}

/**
 * 路由
 */
export const routes: Routes = {
  tools: [
    // 工具箱
    ['/tools/ocr', '百度识图'],
    ['/tools/translate', '谷歌翻译'],
    ['/tools/vehicle', '车辆识别'],
    ['/tools/json', 'JSON解析'],
    ['/tools/nsfw', 'NSFW'],
    ['/tools/dev', 'Dev'],
    ['/tools/jwt-decode', 'JWT解包'],
    ['/tools/other-tools', '其他实用工具'],
  ],
  sandbox: [
    // 沙盒
    ['/sandbox/react', 'React 沙盒'],
  ],
  github: [
    // Github
    ['/github/star', '收藏项目'],
  ],
  query: [['/query/ascii', 'ASCII 对照表']],
};
