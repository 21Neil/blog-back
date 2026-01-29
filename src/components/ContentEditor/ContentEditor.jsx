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
import compressImage from '../../utils/compressImage';
import { ImagePlus } from 'lucide-react';
import { useEffect } from 'react';

const ContentEditor = ({ form, setNoticeTitle, openNoticeModal, postId }) => {
  const navigate = useNavigate();
  const { post } = useFetch(true, navigate);

  const handleImageUpload = async file => {
    const formData = new FormData();

    try {
      const compressedImage = await compressImage(file);

      formData.append('uploadImage', compressedImage);
      formData.append('postId', postId);

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
      Image,
      FileHandler.configure({
        allowedMimeTypes: [
          'image/png',
          'image/jpeg',
          'image/gif',
          'image/webp',
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            handleImage(currentEditor, file, pos);
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            console.log(file);
            if (htmlContent) {
              return false;
            }

            handleImage(
              currentEditor,
              file,
              currentEditor.state.selection.anchor,
            );
          });
        },
      }),
    ],
  });

  const handleInsertImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.onchange = async () => {
      const files = Array.from(input.files || []);
      if (files.length > 0 && editor) {
        const pos = editor.state.selection.anchor;

        files.forEach(file => {
          handleImage(editor, file, pos);
        });
      }
    };

    input.click();
  };

  useEffect(() => {
    form.getInputProps('JSONContent').onChange(editor.getJSON());
  }, [form, editor])

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
          <RichTextEditor.Control
            onClick={handleInsertImage}
            aria-label='Insert image'
          >
            <ImagePlus size={16} strokeWidth={1.5} />
          </RichTextEditor.Control>
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
