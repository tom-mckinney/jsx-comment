'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jsx-comment:toggleComment': () => this.toggleComment()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
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
      }
      else {
        text = `{/*${text}*/}`;
      }

      editor.setTextInBufferRange(newRange, text);
    }
  }

};
