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
      const selection = editor.getSelectedText();
      if(selection.length > 0) {
        console.log(selection);
        console.log(selection.length);
        const commentedSelection = `{/*${selection}*/}`;
        editor.insertText(commentedSelection);
      }


      // return (
      //   this.modalPanel.isVisible() ?
      //   this.modalPanel.hide() :
      //   this.modalPanel.show()
      // );
    }
  }

};
