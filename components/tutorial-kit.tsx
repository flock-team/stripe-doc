import { PlayIcon } from '@heroicons/react/solid';
import { Icon } from '@icons-pack/react-simple-icons';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { DocId } from '../docs/doc-titles';
import { DocType } from '../docs/doc-tree';
import { getCompleteDocs, resetCompleteDocs } from '../lib/doc-storage';
import DocGrid from './doc-grid';
import DocModal from './doc-modal';
import { useMediaQuery } from 'react-responsive';
import DocList from './doc-list';

type Props = {
  type: DocType;
  title: string;
  description: ReactNode;
  scenes: string[];
  videoURL: string;
  demo: {
    title: string;
    description: ReactNode;
  };
};

const TutorialKit = ({
  title,
  description,
  scenes,
  type,
  videoURL,
  demo,
}: Props) => {
  const [completeDocs, setCompleteDocs] = useState<DocId[]>();
  const router = useRouter();

  const docId = router.query.id as DocId;

  const changeRoute = (id?: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: id ? { id } : {},
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  useEffect(() => {
    setCompleteDocs(getCompleteDocs());
  }, []);

  const resetCompletes = () => {
    setCompleteDocs(resetCompleteDocs());
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div>
        <div className="bg-gray-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-10 lg:flex items-center">
              <a
                href={videoURL}
                target="_blank"
                className="aspect-video bg-slate-800 flex items-center justify-center rounded-lg lg:w-96 lg:mr-10 mb-6 lg:mb-0 shadow-lg hover:shadow-xl transition-shadow"
                rel="noreferrer"
              >
                <PlayIcon className="w-20 h-20 text-gray-300 opacity-40" />
              </a>
              <div className="flex-1">
                <h1 className="text-2xl mb-4 leading-6 font-semibold text-gray-800">
                  {title}
                </h1>
                <div className="text-gray-500 mb-6">{description}</div>
                <div>
                  <h2 className="text-gray-700 font-bold mb-2">利用シーン</h2>
                  <p className="text-gray-500">{scenes.join(' / ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="mt-6 mb-10 max-w-3xl">
            <h2 className="font-bold text-2xl mb-4 text-gray-800">
              {demo.title}
            </h2>
            <p className="opacity-80 leading-relaxed">{demo.description}</p>
            <button className="text-gray-400 mt-4" onClick={resetCompletes}>
              完了状態をリセットする
            </button>
          </div>

          <div className="mb-20">
            {isDesktopOrLaptop ? (
              <DocGrid type={type} completeDocs={completeDocs} />
            ) : (
              <DocList type={type} completeDocs={completeDocs} />
            )}
          </div>
        </div>
      </div>
      <DocModal
        isOpen={Boolean(docId)}
        onClose={() => changeRoute()}
        onComplete={(newCompleteDocs) => {
          changeRoute();
          setCompleteDocs(newCompleteDocs);
        }}
        id={docId}
      />
    </div>
  );
};

export default TutorialKit;
