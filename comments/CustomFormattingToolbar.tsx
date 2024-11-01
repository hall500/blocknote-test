import "@blocknote/core/style.css";
import {
  BasicTextStyleButton,
  ColorStyleButton,
  CreateLinkButton,
  FormattingToolbar,
  FormattingToolbarController,
  ImageCaptionButton,
  NestBlockButton,
  ReplaceImageButton,
  TextAlignButton,
  UnnestBlockButton,
  useEditorSelectionChange,
  useBlockNoteEditor,
} from "@blocknote/react";
import { BlockSchema, InlineContentSchema, StyleSchema } from "@blocknote/core";
import { CreateCommentButton } from "./CreateCommentButton";
import { useState } from "react";
// import { CreateCommentButton } from "@defensestation/blocknote-comments";
// import { CustomBlockTypeDropdown } from "./CustomBlockTypeDropDown";

export const CustomFormattingToolbar = ({ pageId }: { pageId: string }) => {
  const editor = useBlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >();
  const [isVisible, setVisible] = useState(false);
  useEditorSelectionChange(() => {
    const selection = editor.getSelection();

    let blocks = [];
    if (selection !== undefined) {
      blocks = selection.blocks;
    } else {
      blocks = [editor.getTextCursorPosition().block];
    }
    const isTrue = blocks.some(
      (block) =>
        block.type !== "mermaid" &&
        block.type !== "role" &&
        block.type !== "control" &&
        block.type !== "code"
    );
    setVisible(isTrue);
  }, editor);
  return isVisible ? (
    <FormattingToolbarController
      formattingToolbar={() => (
        <FormattingToolbar>
          <ImageCaptionButton key={"imageCaptionButton"} />
          <ReplaceImageButton key={"replaceImageButton"} />

          <BasicTextStyleButton
            basicTextStyle={"bold"}
            key={"boldStyleButton"}
          />
          <BasicTextStyleButton
            basicTextStyle={"italic"}
            key={"italicStyleButton"}
          />
          <BasicTextStyleButton
            basicTextStyle={"underline"}
            key={"underlineStyleButton"}
          />
          <BasicTextStyleButton
            basicTextStyle={"strike"}
            key={"strikeStyleButton"}
          />
          <BasicTextStyleButton
            key={"codeStyleButton"}
            basicTextStyle={"code"}
          />

          <TextAlignButton textAlignment={"left"} key={"textAlignLeftButton"} />
          <TextAlignButton
            textAlignment={"center"}
            key={"textAlignCenterButton"}
          />
          <TextAlignButton
            textAlignment={"right"}
            key={"textAlignRightButton"}
          />
          <ColorStyleButton key={"colorStyleButton"} />

          <NestBlockButton key={"nestBlockButton"} />
          <UnnestBlockButton key={"unnestBlockButton"} />

          <CreateLinkButton key={"createLinkButton"} />
          <CreateCommentButton key={"commentButton"} pageId={pageId} />
        </FormattingToolbar>
      )}
    />
  ) : null;
};
