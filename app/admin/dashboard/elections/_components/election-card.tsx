import { Card, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatTime } from '@/lib/utils';

const ElectionCard = ({ collection }: { collection: any }) => {
  let totalCandidates = 0;

  collection.polls.forEach((poll: any) => {
    totalCandidates += poll.no_of_options;
  });

  console.log('Total Candidates', totalCandidates);
  return (
    <div className="border rounded-lg px-5 py-6 shadow-md bg-card">
      <div>
        <h3 className="font-semibold text-lg">{collection.title}</h3>
      </div>
      <Separator className="my-2" />
      <div className="space-y-2">
        <div className="flex gap-x-2">
          <h3 className="font-semibold text-foreground/80 text-sm">
            Start Date:{' '}
          </h3>
          <p className="text-muted-foreground font-medium text-sm">
            {formatDate(collection.start_time)}
          </p>
        </div>
        <div className="flex gap-x-2">
          <h3 className="font-semibold text-foreground/80 text-sm">
            Start Time:{' '}
          </h3>
          <p className="text-muted-foreground font-medium text-sm">
            {formatTime(collection.start_time)}
          </p>
        </div>
        <div className="flex gap-x-2">
          <h3 className="font-semibold text-foreground/80 text-sm">
            End Date:{' '}
          </h3>
          <p className="text-muted-foreground font-medium text-sm">
            {formatDate(collection.end_time)}
          </p>
        </div>
        <div className="flex gap-x-2">
          <h3 className="font-semibold text-foreground/80 text-sm">
            End Time:{' '}
          </h3>
          <p className="text-muted-foreground font-medium text-sm">
            {formatTime(collection.end_time)}
          </p>
        </div>
        <div className="flex gap-x-2">
          <h3 className="font-semibold text-foreground/80 text-sm">
            Number of Positions:{' '}
          </h3>
          <p className="text-muted-foreground font-medium text-sm">
            {collection.polls.length}
          </p>
        </div>
        <div className="flex gap-x-2">
          <h3 className="font-semibold text-foreground/80 text-sm">
            Total Candidates:{' '}
          </h3>
          <p className="text-muted-foreground font-medium text-sm">
            {totalCandidates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElectionCard;
