import { Typography } from '@mui/material';

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
  initStart?: any;
  initEnd?: any;
  onCreateSuccess?: () => void;
}

export default function EditConstructionDialog({
  constructionId,
  dialogOpen,
  initStart,
  initEnd,
  onClose,
  onCreateSuccess,
}: Readonly<Props>) {
  const user = useCurrentUser();
  const [construction, setConstruction] = useState<Maybe<Construction>>(null);

  useEffect(() => {
    if (!constructionId) {
      setConstruction({
        start: initStart,
        end: initEnd,
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
  }, [constructionId, user, initStart, initEnd]);

  const handleSaveRequest = () => {
    appRequest(constructionId ? 'put' : 'post')(constructionById(constructionId ?? ''), {
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

  return (
    <AppDialog
      title="Baustelle bearbeiten"
      onClose={onClose}
      open={dialogOpen}
      onConfirm={handleSaveRequest}
    >
      {construction === null ? (
        <Typography>Unbekannte Baustellen-ID</Typography>
      ) : (
        <EditConstructionWidget construction={construction} setConstruction={setConstruction} />
      )}
    </AppDialog>
  );
}
