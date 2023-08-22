/// <reference types="@ltspkg/types.kityminder-core" />

declare namespace kityminder {
  interface KMEditor {
    MimeType: any;
    container: HTMLElement;
    selector: string | HTMLElement;
    minder: kityminder.Minder;
    editText(): void;
    fsm: {
      /**
       * 状态跳转
       * 会通知所有的状态跳转监视器
       * @param newState 新状态名称
       * @param reason 跳转的原因，可以作为参数传递给跳转监视器
       */
      jump(newState: string, reason: any): void;
      /**
       * 返回当前状态
       */
      state(): string;
      /**
       * 添加状态跳转监视器
       * @param condition 监视的时机 "* => *" （默认）
       * @param handler 监视函数，当状态跳转的时候，会接收三个参数
       *         * from - 跳转前的状态
       *         * to - 跳转后的状态
       *         * reason - 跳转的原因
       */
      when(condition: string, handler: (from: string, to: string, reason: string) => void): void;
    };
    history: {
      hasUndo(): boolean;
      hasRedo(): boolean;
      redo(): void;
      reset(): void;
      undo(): void;
    };
    hotbox: any;
    receiver: {
      element: HTMLElement;
      selectAll(): void;
      enable(): void;
      disable(): void;
      fixFFCaretDisappeared(): void;
      onblur(handler: HTMLElement['onblur']): void;
    };
  }

  interface KMEditorConstructor {
    new (selector: string | HTMLElement): KMEditor;
    assemble: (runtime: (this: KMEditor, editor: KMEditor) => void) => void;
  }

  const Editor: KMEditorConstructor;
}
