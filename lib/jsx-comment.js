'use babel';

import JsxCommentView from './jsx-comment-view';
import { CompositeDisposable } from 'atom';

export default {

  jsxCommentView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jsxCommentView = new JsxCommentView(state.jsxCommentViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jsxCommentView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jsx-comment:toggle': () => this.toggle(),
      'jsx-comment:toggleComment': () => this.toggleComment()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jsxCommentView.destroy();
  },

  serialize() {
    return {
      jsxCommentViewState: this.jsxCommentView.serialize()
    };
  },

  toggle() {
    console.log('JsxComment was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  toggleComment() {
    let editor;
    if(editor = atom.workspace.getActiveTextEditor()) {
      const range = editor.getSelectedBufferRange(),
        indentation = editor.indentationForBufferRow(range.start.row),
        tabLength = editor.getTabLength();

      editor.setSelectedBufferRange([[range.start.row, (indentation * tabLength)], [range.end.row, Infinity]]);

      let newRange = editor.getSelectedBufferRange(),
        text = editor.getTextInBufferRange(newRange);

      if(text.indexOf('{/*') != -1 && text.lastIndexOf('*/}') != -1) {
        text = text.substring(text.indexOf('{/*') + 3, text.lastIndexOf('*/}'));
        // editor.setTextInBufferRange(newRange, test)
      }
      else {
        text = `{/*${text}*/}`;
        // editor.setTextInBufferRange(newRange, `{/*${text}*/}`)
      }

      editor.setTextInBufferRange(newRange, text);

      // editor.selectToFirstCharacterOfLine();
      // const selection = editor.getLastSelection(),
      //   cursor = editor.getLastCursor(),
      //   range = editor.getSelectedBufferRange(),
      //   rows = range.getRows(),
      //   start = 0,
      //   end = rows.length - 1,
      //   text = selection.getText(),
      //   length = text.length;
      //
      // console.log(editor.getLastBufferRow());
      // console.log(range);
      //
      // // editor.selectToBeginningOfLine();
      // // editor.selectToEndOfLine();
      //
      // if(range.isSingleLine()) {
      //   const indentation = editor.indentationForBufferRow(range.start.row),
      //     tabLength = editor.getTabLength();
      //   console.log(indentation);
      //   console.log(tabLength);
      //   editor.setSelectedBufferRange([[range.start.row, (indentation * tabLength)], [range.end.row, Infinity]])
      //   const newRange = editor.getSelectedBufferRange(),
      //     test = editor.getTextInBufferRange(newRange);
      //   editor.setTextInBufferRange(newRange, `{/*${test}*/}`)
      //   console.log(newRange);
      //   // console.log(editor.getSelectedBufferRange());
      // }
      // else if(rows.hasOwnProperty(start) && rows.hasOwnProperty(end)) {
      //   const startRow = rows[start],
      //     endRow = rows[end];
      //   console.log(startRow);
      //   console.log(editor.lineTextForBufferRow(startRow));
      //   console.log(editor.indentationForBufferRow(startRow));
      //   console.log(endRow);
      //   console.log(editor.lineTextForBufferRow(endRow));
      //   // console.log(editor.rangeForRow(startRow));
      // }

      // console.log(rows);
      // for(var r in rows) {
      //   if(!rows.hasOwnProperty(r))
      //     continue;
      //   const row = rows[r];
      //   console.log(row);
      //   console.log(editor.lineTextForBufferRow(row));
      // }

      // console.log(range);
      // console.log(range.isEmpty());
      // console.log(range.isSingleLine());
      // console.log(range.getRowCount());
      // console.log(range.getRows());
      //
      // console.log(editor.lineTextForBufferRow(range.getRows()[0]));
      // console.log(editor.getTextInBufferRange(range));


      // console.log(selection);
      // console.log(cursor);
      // console.log(range);
      // // console.log(length);
      //
      // console.log(this.isMultiLine(range));

      // if(length > 0) {
      //   const commentedSelection = `{/*${text}*/}`;
      //   editor.insertText(commentedSelection);
      // }


      // return (
      //   this.modalPanel.isVisible() ?
      //   this.modalPanel.hide() :
      //   this.modalPanel.show()
      // );
    }
  }

};
