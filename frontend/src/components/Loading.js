'use client';

const Loading = ({ fullScreen = false, text = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 dark:border-primary-900 dark:border-t-primary-400" />
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-200 border-t-primary-600 dark:border-primary-900 dark:border-t-primary-400" />
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{text}</p>
      </div>
    </div>
  );
};

export default Loading;
