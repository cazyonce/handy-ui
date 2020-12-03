import { Injectable } from '@angular/core';

@Injectable()
export class ElementToolService {
    
    /**
     * 
     * @param px demo: 10px
     * @return 10
     */
    parsePXToInt(px: string): number {
        if (px != "" && px !== "0px") {
            return Number.parseInt(px.substring(0, px.length - 2));
        }
        return 0;
    }

    /**
     * 获取标签样式
     * @param el dom对象
     * @param styleName 样式名
     */
    getElementStyle(el, styleName:string) {
        if (el.currentStyle) {
            return el.currentStyle[styleName] //ie下获取样式
        } else {
            return document.defaultView.getComputedStyle(el, null)[styleName]//谷歌，火狐下获取默认样式
        }
    }
}