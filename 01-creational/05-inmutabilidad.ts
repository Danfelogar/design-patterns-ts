/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  copyWith({
    content,
    cursorPosition,
    unsavedChanges,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsavedChanges ?? this.unsavedChanges
    );
  }

  displayInfo() {
    console.log(`%cContent: ${this.content}`, COLORS.cyan);
    console.log(`%cCursor Position: ${this.cursorPosition}`, COLORS.green);
    console.log(`%cUnsaved Changes: ${this.unsavedChanges}`, COLORS.yellow);
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }
    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }
}

function main() {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState(
    "console.log('Hello, World!');",
    2,
    false
  );
  history.save(editorState);
  editorState.displayInfo();
  console.log("\n %cInitial State:", COLORS.blue);

  editorState = editorState.copyWith({
    content: "console.log('Hello, World!');  \nconsole.log('Goodbye!');",
    cursorPosition: 3,
    unsavedChanges: true,
  });
  history.save(editorState);
  editorState.displayInfo();
  console.log("\n %cAfter Modification:", COLORS.blue);

  editorState = editorState.copyWith({ cursorPosition: 5 });
  history.save(editorState);
  editorState.displayInfo();

  console.log("\n %cafter the undo operation:", COLORS.blue);
  editorState = history.undo()!;
  editorState.displayInfo();

  console.log("\n %cafter the redo operation:", COLORS.blue);
  editorState = history.redo()!;
  editorState.displayInfo();
}

main();
