/**
 * RichTextEditor default sample
 */
import { RichTextEditor, Toolbar, Image,  Link, HtmlEditor, QuickToolbar, NodeSelection } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Image,  Link, HtmlEditor, QuickToolbar );

this.default = (): void => {

    let defaultRTE: RichTextEditor = new RichTextEditor({
        quickToolbarSettings: {
            image: [
                'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
                'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension',
                {
                    tooltipText: 'Rotate Left',
                    template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-rotate-left"></span>'
                },
                {
                    tooltipText: 'Rotate Right',
                    template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-rotate-right"></span>'
                }
            ]
        },
        toolbarClick: onToolbarClick,
    });
    defaultRTE.appendTo('#defaultRTE');

    function onToolbarClick(e: any): void {
        let nodeObj: NodeSelection = new NodeSelection();
        let range: Range = nodeObj.getRange(defaultRTE.contentModule.getDocument());
        let imgEle: HTMLElement = nodeObj.getNodeCollection(range)[0] as HTMLElement;
        if (e.item.tooltipText === 'Rotate Right') {
            let transform: number = (imgEle.style.transform === '') ? 0 :
                parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
            imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
        } else if (e.item.tooltipText === 'Rotate Left') {
            let transform: number = (imgEle.style.transform === '') ? 0 :
                Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
            imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
        }
    }
};
