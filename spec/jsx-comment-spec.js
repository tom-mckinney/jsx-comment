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
        expect('<span>test</span>').toEqual('{/*<span>test</span>*/}');
      })

    });
  });

  // describe('when the jsx-comment:toggle event is triggered', () => {
  //   it('hides and shows the modal panel', () => {
  //     // Before the activation event the view is not on the DOM, and no panel
  //     // has been created
  //     expect(workspaceElement.querySelector('.jsx-comment')).not.toExist();
  //
  //     // This is an activation event, triggering it will cause the package to be
  //     // activated.
  //     atom.commands.dispatch(workspaceElement, 'jsx-comment:toggle');
  //
  //     waitsForPromise(() => {
  //       return activationPromise;
  //     });
  //
  //     runs(() => {
  //       expect(workspaceElement.querySelector('.jsx-comment')).toExist();
  //
  //       let jsxCommentElement = workspaceElement.querySelector('.jsx-comment');
  //       expect(jsxCommentElement).toExist();
  //
  //       let jsxCommentPanel = atom.workspace.panelForItem(jsxCommentElement);
  //       expect(jsxCommentPanel.isVisible()).toBe(true);
  //       atom.commands.dispatch(workspaceElement, 'jsx-comment:toggle');
  //       expect(jsxCommentPanel.isVisible()).toBe(false);
  //     });
  //   });
  //
  //   it('hides and shows the view', () => {
  //     // This test shows you an integration test testing at the view level.
  //
  //     // Attaching the workspaceElement to the DOM is required to allow the
  //     // `toBeVisible()` matchers to work. Anything testing visibility or focus
  //     // requires that the workspaceElement is on the DOM. Tests that attach the
  //     // workspaceElement to the DOM are generally slower than those off DOM.
  //     jasmine.attachToDOM(workspaceElement);
  //
  //     expect(workspaceElement.querySelector('.jsx-comment')).not.toExist();
  //
  //     // This is an activation event, triggering it causes the package to be
  //     // activated.
  //     atom.commands.dispatch(workspaceElement, 'jsx-comment:toggle');
  //
  //     waitsForPromise(() => {
  //       return activationPromise;
  //     });
  //
  //     runs(() => {
  //       // Now we can test for view visibility
  //       let jsxCommentElement = workspaceElement.querySelector('.jsx-comment');
  //       expect(jsxCommentElement).toBeVisible();
  //       atom.commands.dispatch(workspaceElement, 'jsx-comment:toggle');
  //       expect(jsxCommentElement).not.toBeVisible();
  //     });
  //   });
  // });

});
