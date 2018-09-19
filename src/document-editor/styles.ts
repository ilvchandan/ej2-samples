import { DocumentEditor, RequestNavigateEventArgs, ViewChangeEventArgs } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import { ToolBar } from './tool-bar';
import { StatusBar } from './status-bar';
import { TextProperties } from './text-properties-pane';
import { TableProperties } from './table-properties-pane';
import { ImageProperties } from './image-properties-pane';
import { DocumentLoader } from './document-loader';
import { HeaderFooterProperties } from './header-footer-pane';
import { TocProperties } from './table-of-contents-pane';
import { PropertiesPane } from './properties-pane';
import { TemplateLoader } from './template-loader';
/**
 * Default document editor sample
 */
//tslint:disable: max-func-body-length
this.default = (): void => {
    //open new tab
    // tslint:disable-next-line:max-line-length
    document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/styles/index.html#fabric');
    let containerPanel: HTMLElement = document.getElementById('documenteditor_container_body');
    updateContainerSize();
    let documenteditor: DocumentEditor = new DocumentEditor({ isReadOnly: false });
    documenteditor.acceptTab = true;
    documenteditor.enableAllModules();
    documenteditor.pageOutline = '#E0E0E0';
    documenteditor.appendTo('#container');
    documenteditor.selectionChange = () => {
        setTimeout(() => { onSelectionChange(); }, 20);
    };
    documenteditor.documentChange = (): void => {
        toolbar.updateUndoRedoBtn();
        toolbar.isContentChange = false;
        applyPageCountAndDocumentTitle();
        fontProperties.updateStyles();
    };
    documenteditor.contentChange = (): void => {
        toolbar.isContentChange = true;
        if (!toolbar.isReadOnly) {
            toolbar.updateUndoRedoBtn();
        }
        //Set page count
        statusBar.updatePageCount();
    };
    window.addEventListener('resize', (): void => { onWindowResize(); });
    //Initializes property pane.
    let tocProperties: TocProperties = new TocProperties(documenteditor);
    let headerFooter: HeaderFooterProperties = new HeaderFooterProperties(documenteditor);
    let fontProperties: TextProperties = new TextProperties(documenteditor, 'textProperty');
    let imageProperties: ImageProperties = new ImageProperties(documenteditor);
    let tableProperties: TableProperties = new TableProperties(documenteditor, imageProperties, fontProperties);
    // tslint:disable-next-line:max-line-length
    let propertiesPane: PropertiesPane = new PropertiesPane(documenteditor, fontProperties, tableProperties, headerFooter, imageProperties, tocProperties);
    //Initializes document editor toolbar and events.
    // tslint:disable-next-line:max-line-length
    let toolbar: ToolBar = new ToolBar(documenteditor, document.getElementById('documenteditor_toolbar'), propertiesPane);
    toolbar.documentLoader = new DocumentLoader(documenteditor);
    toolbar.templateLoader = new TemplateLoader();
    if (!toolbar.isReadOnly) {
        toolbar.updateUndoRedoBtn();
    }
    document.getElementById('documenteditor_titlebar').style.display = '';
    document.getElementById('documenteditor_statusbar').style.display = '';
    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), documenteditor, true);
    let statusBar: StatusBar = new StatusBar(document.getElementById('documenteditor_statusbar'), documenteditor);
    updateContainerSize();
    documenteditor.resize();
    onLoadDefault();
    applyPageCountAndDocumentTitle();
    showPropertiesPaneOnInitial();
    documenteditor.requestNavigate = (args: RequestNavigateEventArgs) => {
        if (args.linkType !== 'Bookmark') {
            let link: string = args.navigationLink;
            if (args.localReference.length > 0) {
                link += '#' + args.localReference;
            }
            window.open(link);
            args.isHandled = true;
        }
    };
    documenteditor.zoomFactorChange = (): void => {
        statusBar.updateZoomContent();
    };
    documenteditor.viewChange = (e: ViewChangeEventArgs): void => {
        statusBar.updatePageNumberOnViewChange(e);
    };
    function onValueChange(args: any): void {
        documenteditor.zoomFactor = parseInt(args.value as any, 10) / 100;
    }
    function applyPageCountAndDocumentTitle(): void {
        //Sets Document name.
        titleBar.updateDocumentTitle();
        statusBar.updatePageCount();
    }
    function updateContainerSize(): void {
        let titleBarDiv: HTMLElement = document.getElementById('documenteditor_titlebar');
        let statusBarDiv: HTMLElement = document.getElementById('documenteditor_statusbar');
        let toolBarDiv: HTMLElement = document.getElementById('documenteditor_toolbar');
        if (containerPanel && titleBarDiv && statusBarDiv && toolBarDiv) {
            containerPanel.style.height = (window.innerHeight - (titleBarDiv.offsetHeight
                + toolBarDiv.offsetHeight + statusBarDiv.offsetHeight)) + 'px';
        }
    }
    function showPropertiesPaneOnInitial(): void {
        toolbar.showPropertiesPaneOnSelection();
    }
    function onSelectionChange(): void {
        if (documenteditor.selection) {
            statusBar.startPage = documenteditor.selection.startPage;
            statusBar.updatePageNumber();
            toolbar.showPropertiesPaneOnSelection();
        }
    }

    function onLoadDefault(): void {
        // tslint:disable
        let defaultDocument: object = { "sections": [{ "blocks": [{ "paragraphFormat": { "styleName": "Title" }, "inlines": [{ "text": "Styles" }] }, { "paragraphFormat": { "styleName": "Subtitle" }, "inlines": [{ "text": "A" }, { "text": " style is a collection of formatting instructions" }, { "text": " " }, { "text": "to provide a consistent look of the document" }, { "text": "." }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Quote" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog" }, { "text": " [Quote]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [{ "name": "_GoBack", "bookmarkType": 0 }, { "name": "_GoBack", "bookmarkType": 1 }] }, { "paragraphFormat": { "styleName": "Heading 1" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog " }, { "text": "[" }, { "text": "Heading 1" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 2" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog " }, { "text": "[" }, { "text": "Heading 2" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 3" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog" }, { "text": " " }, { "text": "[" }, { "text": "Heading 3" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 4" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog " }, { "text": "[Heading 4" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }, { "paragraphFormat": { "styleName": "Heading 5" }, "inlines": [{ "text": "The quick brown fox jumps over the lazy dog " }, { "text": "[" }, { "text": "Heading 5" }, { "text": "]" }] }, { "paragraphFormat": { "styleName": "Normal" }, "inlines": [] }], "headersFooters": {}, "sectionFormat": { "headerDistance": 36.0, "footerDistance": 36.0, "pageWidth": 612.0, "pageHeight": 792.0, "leftMargin": 72.0, "rightMargin": 72.0, "topMargin": 72.0, "bottomMargin": 72.0, "differentFirstPage": false, "differentOddAndEvenPages": false } }], "characterFormat": { "fontSize": 11.0, "fontFamily": "Calibri" }, "paragraphFormat": { "afterSpacing": 8.0, "lineSpacing": 1.0791666507720947, "lineSpacingType": "Multiple" }, "background": { "color": "#FFFFFFFF" }, "styles": [{ "type": "Paragraph", "name": "Normal", "next": "Normal" }, { "type": "Paragraph", "name": "Heading 1", "basedOn": "Normal", "next": "Normal", "link": "Heading 1 Char", "characterFormat": { "fontSize": 16.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 12.0, "afterSpacing": 0.0, "outlineLevel": "Level1" } }, { "type": "Paragraph", "name": "Heading 2", "basedOn": "Normal", "next": "Normal", "link": "Heading 2 Char", "characterFormat": { "fontSize": 13.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level2" } }, { "type": "Paragraph", "name": "Heading 3", "basedOn": "Normal", "next": "Normal", "link": "Heading 3 Char", "characterFormat": { "fontSize": 12.0, "fontFamily": "Calibri Light", "fontColor": "#1F3763FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level3" } }, { "type": "Paragraph", "name": "Heading 4", "basedOn": "Normal", "next": "Normal", "link": "Heading 4 Char", "characterFormat": { "italic": true, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level4" } }, { "type": "Paragraph", "name": "Heading 5", "basedOn": "Normal", "next": "Normal", "link": "Heading 5 Char", "characterFormat": { "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" }, "paragraphFormat": { "beforeSpacing": 2.0, "afterSpacing": 0.0, "outlineLevel": "Level5" } }, { "type": "Character", "name": "Default Paragraph Font" }, { "type": "Paragraph", "name": "Notes", "basedOn": "Normal", "next": "Normal", "characterFormat": { "bold": true }, "paragraphFormat": { "afterSpacing": 6.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Paragraph", "name": "Quote", "basedOn": "Normal", "next": "Normal", "link": "Quote Char", "characterFormat": { "italic": true, "fontColor": "#404040FF" }, "paragraphFormat": { "leftIndent": 43.200000762939453, "rightIndent": 43.200000762939453, "beforeSpacing": 10.0, "textAlignment": "Center" } }, { "type": "Character", "name": "Quote Char", "basedOn": "Default Paragraph Font", "characterFormat": { "italic": true, "fontColor": "#404040FF" } }, { "type": "Paragraph", "name": "Title", "basedOn": "Normal", "next": "Normal", "link": "Title Char", "characterFormat": { "fontSize": 28.0, "fontFamily": "Calibri Light" }, "paragraphFormat": { "afterSpacing": 0.0, "lineSpacing": 1.0, "lineSpacingType": "Multiple" } }, { "type": "Character", "name": "Title Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 28.0, "fontFamily": "Calibri Light" } }, { "type": "Character", "name": "Heading 1 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 16.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "Heading 2 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 13.0, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "Heading 3 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontSize": 12.0, "fontFamily": "Calibri Light", "fontColor": "#1F3763FF" } }, { "type": "Character", "name": "Heading 4 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "italic": true, "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Character", "name": "Heading 5 Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontFamily": "Calibri Light", "fontColor": "#2F5496FF" } }, { "type": "Paragraph", "name": "Intense Quote", "basedOn": "Normal", "next": "Normal", "link": "Intense Quote Char", "characterFormat": { "italic": true, "fontColor": "#4472C4FF" }, "paragraphFormat": { "leftIndent": 43.200000762939453, "rightIndent": 43.200000762939453, "beforeSpacing": 18.0, "afterSpacing": 18.0, "textAlignment": "Center" } }, { "type": "Character", "name": "Intense Quote Char", "basedOn": "Default Paragraph Font", "characterFormat": { "italic": true, "fontColor": "#4472C4FF" } }, { "type": "Paragraph", "name": "Subtitle", "basedOn": "Normal", "next": "Normal", "link": "Subtitle Char", "characterFormat": { "fontColor": "#5A5A5AFF" }, "paragraphFormat": { "listFormat": { "listLevelNumber": 1 } } }, { "type": "Character", "name": "Subtitle Char", "basedOn": "Default Paragraph Font", "characterFormat": { "fontColor": "#5A5A5AFF" } }] };
        // tslint:enable
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        documenteditor.open(JSON.stringify(defaultDocument));
        documenteditor.documentName = 'Styles';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        documenteditor.focusIn();
        fontProperties.updateStyles();
    }
    function onWindowResize(): void {
        updateContainerSize();
    }
};
