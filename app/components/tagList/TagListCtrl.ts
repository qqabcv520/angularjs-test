/**
 * Created by 米饭 on 2017-07-12.
 */

import TagLoadService from "../../commons/tagLoad/TagLoadService";
import {isNumber} from "util";


/*@ngInject*/
export default class TagListCtrl {


    private tagList: Array<{letter: string, data: Array<ITag>}>;

    constructor(private TagLoadService: TagLoadService) {
        TagLoadService.loadList().then(tagsTemp => {
            this.tagList = this.pySort(tagsTemp);
        })
    }



    private pySort(arr: Array<ITag>) {

        let letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');
        let zh ="啊把差大额发噶哈*级卡啦吗那哦爬器然撒他**哇西呀咋".split('');     //*占位没有i,u,v拼音开头的汉字



        let result = [];
        let curr: {letter: string, data: Array<ITag>};
        for(let i = 0; i < letters.length; i++){
            curr = {letter: letters[i], data: []};

            if(i != 26){ //首字母存在的情况
                for(let j = 0; j < arr.length; j++) {
                    let initial = arr[j].name.charAt(0);           //截取第一个字符
                    if(arr[j].name.charAt(0)==letters[i] || arr[j].name.charAt(0)==letters[i].toLowerCase()) { //首字符是英文的
                        curr.data.push(arr[j]);
                    }else if(zh[i]!='*' && this.isChinese(initial)){      //判断是否是无汉字,是否是中文
                        if(initial.localeCompare(zh[i]) >= 0 &&(!zh[i+1]||initial.localeCompare(zh[i+1]) <0)) {   //判断中文字符在哪一个类别
                            curr.data.push(arr[j]);
                        }
                    }
                }
            } else { //首字母不存在的情况
                for(let k = 0; k < arr.length; k++){
                    let ini = arr[k].name.charAt(0);           //截取第一个字符
                    if(!this.isChar(ini) && !this.isChinese(ini)){
                        curr.data.push(arr[k]);
                    }
                }
            }

            if(curr.data.length) {
                result.push(curr);
                curr.data.sort(function(a,b){
                    return b.name.localeCompare(a.name);       //排序,英文排序,汉字排在英文后面
                });
            }
        }
        return result;
    }

    private isChinese(str: string){
        let reg=/[\u4E00-\u9FA5]/;
        return reg.test(str);
    }

    private isChar(char: string){
        let reg = /[A-Za-z]/;
        return reg.test(char);
    }
}

interface ITag {
    id?: number,
    name: string
}


