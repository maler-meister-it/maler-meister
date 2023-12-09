import { useEffect, useState } from 'react';

import { AppDialog } from '../../components/AppDialog';
import { loadConstructionById } from '../../fetch/api';
import { constructionById } from '../../fetch/endpoints';
import { appRequest } from '../../fetch/fetch-client';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import EditConstructionWidget from './EditConstructionWidget';

interface Props {
  constructionId: string | number | undefined;
  dialogOpen: boolean;
  onClose(): void;

  onCreateSuccess?: () => void;
}

export default function EditConstructionDialog({
  constructionId,
  dialogOpen,

  onClose,
  onCreateSuccess,
}: Props) {
  const user = useCurrentUser();
  const [construction, setConstruction] = useState<Construction | null>(null);

  useEffect(() => {
    if (!constructionId) {
      setConstruction({
        active: false,
        tenant: user?.tenant,
        confirmed: false,
      } as Construction);
    } else {
      loadConstructionById(constructionId)
        .then((con) => {
          if (con) {
            setConstruction(con);
          }
        })
        .catch(console.log);
    }
  }, [constructionId, user]);

  const handleSaveRequest = () => {
    appRequest(constructionId ? 'put' : 'post')(constructionById(constructionId || ''), {
      data: construction,
    })
      .then(() => {
        onCreateSuccess?.();
      })
      .catch((e) => {
        console.log(e);
        alert('Fehler beim speichern!');
      })
      .finally(onClose);
  };

  if (construction) {
    return (
      <AppDialog title="Baustelle bearbeiten" onClose={onClose} open={dialogOpen} onConfirm={handleSaveRequest}>
        <EditConstructionWidget construction={construction} setConstruction={setConstruction} />
      </AppDialog>
    );
  }
  return null;
}
