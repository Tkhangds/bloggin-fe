export const initialContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 1,
      },
      content: [
        {
          type: "emoji",
          attrs: {
            name: "fire",
          },
        },
        {
          type: "text",
          text: " Welcome to Bloggin",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        class: null,
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "Welcome to Bloggin – our React Block Editor built on top of ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/",
                target: "_blank",
                class: null,
              },
            },
          ],
          text: "Tiptap",
        },
        {
          type: "text",
          text: ", ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://nextjs.org/",
                target: "_blank",
                class: null,
              },
            },
          ],
          text: "Next.js",
        },
        {
          type: "text",
          text: " and ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tailwindcss.com/",
                target: "_blank",
                class: null,
              },
            },
          ],
          text: "Tailwind",
        },
        {
          type: "text",
          text: ". This project serves as a great starting point for a great content creation experience.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        class: null,
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "This editor includes features like:",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A DragHandle including a DragHandle menu",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A Slash menu that can be triggered via typing a ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "/",
                },
                {
                  type: "text",
                  text: " into an empty paragraph or by using the ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "+ Button",
                },
                {
                  type: "text",
                  text: " next to the drag handle",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A TextFormatting menu that allows you to change the ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        fontSize: "18px",
                        fontFamily: null,
                        color: null,
                      },
                    },
                  ],
                  text: "font size",
                },
                {
                  type: "text",
                  text: ", ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "font weight",
                },
                {
                  type: "text",
                  text: ", ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        fontSize: null,
                        fontFamily: "Georgia",
                        color: null,
                      },
                    },
                  ],
                  text: "font family",
                },
                {
                  type: "text",
                  text: ", ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        fontSize: null,
                        fontFamily: null,
                        color: "#b91c1c",
                      },
                    },
                  ],
                  text: "color",
                },
                {
                  type: "text",
                  text: ", ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "highlight",
                      attrs: {
                        color: "#7e7922",
                      },
                    },
                  ],
                  text: "highlight",
                },
                {
                  type: "text",
                  text: " and more",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                class: null,
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "A Table of Contents that can be viewed via clicking on the button on the top left corner",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "imageBlock",
      attrs: {
        src: "/placeholder-image.jpg",
        width: "100%",
        align: "center",
      },
    },
    {
      type: "paragraph",
      attrs: {
        class: null,
        textAlign: "left",
      },
    },
  ],
};
