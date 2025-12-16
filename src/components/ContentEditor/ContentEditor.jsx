import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import FileHandler from '@tiptap/extension-file-handler';
import Image from '@tiptap/extension-image';
import styles from './ContentEditor.module.css';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router';

const ContentEditor = ({
  form,
  setNoticeTitle,
  openNoticeModal,
}) => {
  const navigate = useNavigate();
  const { post } = useFetch(true, navigate);

  const handleImageUpload = async file => {
    const formData = new FormData();

    formData.append('uploadImage', file);

    try {
      const res = await post('/admin/posts/upload-content-image', formData);
      return res;
    } catch {
      setNoticeTitle('圖片上傳失敗');
      openNoticeModal();
    }
  };

  const handleImage = async (currentEditor, file, pos) => {
    const uploadRes = await handleImageUpload(file);
    const imageUrl = uploadRes.url;

    currentEditor
      .chain()
      .insertContentAt(pos, {
        type: 'image',
        attrs: {
          src: imageUrl,
        },
      })
      .focus()
      .run();
  };

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => {
      form.getInputProps('TEXTContent').onChange(editor.getText());
      form.getInputProps('HTMLContent').onChange(editor.getHTML());
      form.getInputProps('JSONContent').onChange(editor.getJSON());
    },
    content: form.getValues().JSONContent,
    extensions: [
      StarterKit.configure({ link: false }),
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Color,
      TextStyle,
      Image.configure({
        resize: {
          enabled: true,
          alwaysPreserveAspectRatio: true,
        },
      }),
      FileHandler.configure({
        allowedMimeTypes: [
          'image/png',
          'image/jpeg',
          'image/gif',
          'image/webp',
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(async file => {
            handleImage(currentEditor, file, pos);
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(async file => {
            if (htmlContent) {
              console.log(htmlContent);
              return false;
            }

            handleImage(
              currentEditor,
              file,
              currentEditor.state.selection.anchor
            );
          });
        },
      }),
    ],
  });

  return (
    <RichTextEditor editor={editor} classNames={styles}>
      <RichTextEditor.Toolbar sticky stickyOffset='var(--docs-header-height)'>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.Code />
          <RichTextEditor.ClearFormatting />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.ColorPicker
            colors={[
              '#25262b',
              '#868e96',
              '#fa5252',
              '#e64980',
              '#be4bdb',
              '#7950f2',
              '#4c6ef5',
              '#228be6',
              '#15aabf',
              '#12b886',
              '#40c057',
              '#82c91e',
              '#fab005',
              '#fd7e14',
            ]}
          />
          <RichTextEditor.UnsetColor />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};

export default ContentEditor;
