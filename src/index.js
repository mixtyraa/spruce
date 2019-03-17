$(() =>  {
    const spruce = new Spruce();
    $('#user_word').keyup((e) => {
        spruce.do($(e.target).val());
    });
    
});


class Spruce {
    constructor(){
        this.$spruce = $('#spruce');
        this.lastword = '';
    }

    do(word){
        word = word.replace(/\s/g, '');
        this.$spruce.html('');
        for (let index_level = 0; index_level < word.length; index_level++){
            let level_text = '';
            for(let index_ch = 0; index_ch <= index_level; index_ch++){
                level_text += word[index_ch];
            }
            this.renderLevel(level_text);
        }
    }

    renderLevel(level_text){
        const $lvl = $('<div></div>');
        $lvl.addClass('spruce__level');
        $lvl.text(level_text);
        
        this.$spruce.append($lvl);
    }

};