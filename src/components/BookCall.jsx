import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';

export default function BookCall() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'book-a-call' });
      cal('ui', {
        hideEventTypeDetails: true,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <button
      className="mb-22 inline-block rounded-full bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-900 transition-transform hover:cursor-pointer hover:bg-gray-300 active:scale-90"
      data-cal-namespace="book-a-call"
      data-cal-link="javierlo/book-a-call"
      data-cal-config='{"layout":"month_view"}'
    >
      Book a Call
    </button>
  );
}
