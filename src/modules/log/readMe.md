saving Log to database

## from frontend

src/app/api/logs/route.ts

```
import { LogService } from '@/log/domain/services/LogService.ts'
...
const body = await request.json()
LogService.error(body)
```

## from backend

```
import { LogService } from '@/log/domain/services/LogService.ts'
...
LogService.error('whatever')
```

### detail

depends on @/shared
uses Repository.ts
