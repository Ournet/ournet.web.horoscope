
module.exports = class Widget1 {
    constructor(project, lang, backColor, textColor, iconColor, height, width) {
        this.project = project;
        this.lang = lang;
        this.backColor = backColor || 'fff';
        this.textColor = textColor || '333';
        this.iconColor = iconColor || 'cb5800';
        this.height = height || '100%';
        this.width = width || '100%';
    }

    static createFromQuery(project, lang, query) {
        return new Widget1(project, lang, query.base_color, query.text_color, query.icon_color, query.height, query.width);
    }

    toHtmlScript() {
        return `<!-- ${this.project.name} Widget -->
<iframe src="${this.project.schema}//${this.project.host}/widgets/widget1_frame?ul=${this.lang}&back_color=${this.backColor}&icon_color=${this.iconColor}&text_color=${this.textColor}" scrolling="no" frameborder="0" style="border:none;overflow:hidden;height:${this.height};width:${this.width};" allowTransparency="true"></iframe>
<noscript><a href="${this.project.schema}//${this.project.host}">${this.project.name}</a></noscript>`
    }
}
