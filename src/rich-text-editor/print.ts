/**
 * RichTextEditor print sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

this.default = (): void => {
    let defaultRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold',  'Italic',  'Underline',  '|',  'Formats',  'Alignments',
                'OrderedList',  'UnorderedList',  '|',  'CreateLink',  'Image',  '|',  'SourceCode',  'Undo',  'Redo', 'Print']
        }
    });
    defaultRTE.appendTo('#defaultRTE');

};
