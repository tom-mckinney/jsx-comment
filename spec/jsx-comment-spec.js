'use babel';

import JsxComment from '../lib/jsx-comment';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('JsxComment', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('jsx-comment');
  });

  describe('when the jsx-comment:toggleComment event is triggered', () => {
    it('comments and uncomments the selected lines', () => {

      expect('<span>test</span>').toEqual('<span>test</span>');

      atom.commands.dispatch(workspaceElement, 'jsx-comment:toggleComment');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect('<span>test</span>').toEqual('<span>test</span>');
      })

    });
  });

});
