C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>git status
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        deleted:    .docs/PROYETO-OFICIAL-DESARROLLO.md
        modified:   .docs/comandos-nx.md
        modified:   .nx/workspace-data/80a9aed0-0268-4c44-8f81-db4889a2eeaa.db
        modified:   .nx/workspace-data/eslint-2654242865465226088.hash
        modified:   .nx/workspace-data/file-map.json
        modified:   .nx/workspace-data/jest-7930610538513362720.hash
        modified:   .nx/workspace-data/lockfile.hash
        modified:   .nx/workspace-data/nx_files.nxt
        modified:   .nx/workspace-data/parsed-lock-file.json
        modified:   .nx/workspace-data/project-graph.json
        modified:   .nx/workspace-data/source-maps.json
        modified:   .nx/workspace-data/webpack-5621830741124012108.hash
        modified:   README.md
        deleted:    apps/dfs-invest-suite-e2e/eslint.config.mjs
        deleted:    apps/dfs-invest-suite-e2e/jest.config.ts
        deleted:    apps/dfs-invest-suite-e2e/project.json
        deleted:    apps/dfs-invest-suite-e2e/src/dfs-invest-suite/dfs-invest-suite.spec.ts
        deleted:    apps/dfs-invest-suite-e2e/src/support/global-setup.ts
        deleted:    apps/dfs-invest-suite-e2e/src/support/global-teardown.ts
        deleted:    apps/dfs-invest-suite-e2e/src/support/test-setup.ts
        deleted:    apps/dfs-invest-suite-e2e/tsconfig.json
        deleted:    apps/dfs-invest-suite-e2e/tsconfig.spec.json
        deleted:    apps/dfs-invest-suite/eslint.config.mjs
        deleted:    apps/dfs-invest-suite/jest.config.ts
        deleted:    apps/dfs-invest-suite/project.json
        deleted:    apps/dfs-invest-suite/src/app/app.controller.spec.ts
        deleted:    apps/dfs-invest-suite/src/app/app.controller.ts
        deleted:    apps/dfs-invest-suite/src/app/app.module.ts
        deleted:    apps/dfs-invest-suite/src/app/app.service.spec.ts
        deleted:    apps/dfs-invest-suite/src/app/app.service.ts
        deleted:    apps/dfs-invest-suite/src/assets/.gitkeep
        deleted:    apps/dfs-invest-suite/src/main.ts
        deleted:    apps/dfs-invest-suite/tsconfig.app.json
        deleted:    apps/dfs-invest-suite/tsconfig.json
        deleted:    apps/dfs-invest-suite/tsconfig.spec.json
        deleted:    apps/dfs-invest-suite/webpack.config.js
        modified:   eslint.config.mjs
        modified:   nx.json
        modified:   package.json
        modified:   pnpm-lock.yaml
        modified:   tsconfig.base.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .docs/.BITACORA.md
        .docs/.DEUDA-TECNICA.md
        .docs/.PROYETO-OFICIAL-DESARROLLO.md
        .docs/.ROADMAP.md
        .docs/1-prompt-hidratacion.md
        .docs/Arquitectura-hexagonal-2025.md
        .nx/workspace-data/80a9aed0-0268-4c44-8f81-db4889a2eeaa.db-shm
        .nx/workspace-data/80a9aed0-0268-4c44-8f81-db4889a2eeaa.db-wal
        .nx/workspace-data/d/
        apps/api-main-e2e/
        apps/api-main/
        eslint.config copy-1.mjs.md
        eslint.config copy-2.mjs.md
        libs/

no changes added to commit (use "git add" and/or "git commit -a")

C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>

---
C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>pnpm nx g @nx/workspace:remove --project=core-domain-shared-kernel-commands-queries --files="src/lib/commands-queries.ts,src/lib/commands-queries.spec.ts" --forceRemove

 NX  Generating @nx/workspace:remove

You have passed --forceRemove
DELETE libs/core/domain/shared-kernel/commands-queries/eslint.config.mjs
DELETE libs/core/domain/shared-kernel/commands-queries/jest.config.ts
DELETE libs/core/domain/shared-kernel/commands-queries/project.json
DELETE libs/core/domain/shared-kernel/commands-queries/src/index.ts
DELETE libs/core/domain/shared-kernel/commands-queries/src/lib/command-handler.interface.ts
DELETE libs/core/domain/shared-kernel/commands-queries/src/lib/command.base.ts
DELETE libs/core/domain/shared-kernel/commands-queries/src/lib/command.interface.ts
DELETE libs/core/domain/shared-kernel/commands-queries/src/lib/commands-queries.spec.ts
DELETE libs/core/domain/shared-kernel/commands-queries/src/lib/commands-queries.ts
DELETE libs/core/domain/shared-kernel/commands-queries/src/lib/paginated-query.base.ts
DELETE libs/core/domain/shared-kernel/commands-queries/src/lib/query-handler.interface.ts
DELETE libs/core/domain/shared-kernel/commands-queries/src/lib/query.base.ts
DELETE libs/core/domain/shared-kernel/commands-queries/src/lib/query.interface.ts
DELETE libs/core/domain/shared-kernel/commands-queries/src/lib
DELETE libs/core/domain/shared-kernel/commands-queries/src
DELETE libs/core/domain/shared-kernel/commands-queries/tsconfig.json
DELETE libs/core/domain/shared-kernel/commands-queries/tsconfig.lib.json
DELETE libs/core/domain/shared-kernel/commands-queries/tsconfig.spec.json
DELETE libs/core/domain/shared-kernel/commands-queries
UPDATE tsconfig.base.json

C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>pnpm nx g @nx/workspace:remove --project=core-domain-shared-kernel-entities --files="src/lib/entities.ts,src/lib/entities.spec.ts" --forceRemove

 NX  Generating @nx/workspace:remove

You have passed --forceRemove
DELETE libs/core/domain/shared-kernel/entities/eslint.config.mjs
DELETE libs/core/domain/shared-kernel/entities/jest.config.ts
DELETE libs/core/domain/shared-kernel/entities/project.json
DELETE libs/core/domain/shared-kernel/entities/src/index.ts
DELETE libs/core/domain/shared-kernel/entities/src/lib/aggregate-root.base.ts
DELETE libs/core/domain/shared-kernel/entities/src/lib/entities.spec.ts
DELETE libs/core/domain/shared-kernel/entities/src/lib/entities.ts
DELETE libs/core/domain/shared-kernel/entities/src/lib/entity.base.ts
DELETE libs/core/domain/shared-kernel/entities/src/lib
DELETE libs/core/domain/shared-kernel/entities/src
DELETE libs/core/domain/shared-kernel/entities/tsconfig.json
DELETE libs/core/domain/shared-kernel/entities/tsconfig.lib.json
DELETE libs/core/domain/shared-kernel/entities/tsconfig.spec.json
DELETE libs/core/domain/shared-kernel/entities
UPDATE tsconfig.base.json

C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>pnpm nx g @nx/workspace:remove --project=core-domain-shared-kernel-events --files="src/lib/events.ts,src/lib/events.spec.ts" --forceRemove

 NX  Generating @nx/workspace:remove

You have passed --forceRemove
DELETE libs/core/domain/shared-kernel/events/eslint.config.mjs
DELETE libs/core/domain/shared-kernel/events/jest.config.ts
DELETE libs/core/domain/shared-kernel/events/project.json
DELETE libs/core/domain/shared-kernel/events/src/index.ts
DELETE libs/core/domain/shared-kernel/events/src/lib/domain-event-emitter.interface.ts
DELETE libs/core/domain/shared-kernel/events/src/lib/domain-event-handler.interface.ts
DELETE libs/core/domain/shared-kernel/events/src/lib/domain-event.base.ts
DELETE libs/core/domain/shared-kernel/events/src/lib/domain-event.interface.ts
DELETE libs/core/domain/shared-kernel/events/src/lib/events.spec.ts
DELETE libs/core/domain/shared-kernel/events/src/lib/events.ts
DELETE libs/core/domain/shared-kernel/events/src/lib
DELETE libs/core/domain/shared-kernel/events/src
DELETE libs/core/domain/shared-kernel/events/tsconfig.json
DELETE libs/core/domain/shared-kernel/events/tsconfig.lib.json
DELETE libs/core/domain/shared-kernel/events/tsconfig.spec.json
DELETE libs/core/domain/shared-kernel/events
UPDATE tsconfig.base.json

C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>pnpm nx g @nx/workspace:remove --project=core-domain-shared-kernel-mappers --files="src/lib/mappers.ts,src/lib/mappers.spec.ts" --forceRemove

 NX  Generating @nx/workspace:remove

You have passed --forceRemove
DELETE libs/core/domain/shared-kernel/mappers/eslint.config.mjs
DELETE libs/core/domain/shared-kernel/mappers/jest.config.ts
DELETE libs/core/domain/shared-kernel/mappers/project.json
DELETE libs/core/domain/shared-kernel/mappers/src/index.ts
DELETE libs/core/domain/shared-kernel/mappers/src/lib/mapper.interface.ts
DELETE libs/core/domain/shared-kernel/mappers/src/lib/mappers.spec.ts
DELETE libs/core/domain/shared-kernel/mappers/src/lib/mappers.ts
DELETE libs/core/domain/shared-kernel/mappers/src/lib
DELETE libs/core/domain/shared-kernel/mappers/src
DELETE libs/core/domain/shared-kernel/mappers/tsconfig.json
DELETE libs/core/domain/shared-kernel/mappers/tsconfig.lib.json
DELETE libs/core/domain/shared-kernel/mappers/tsconfig.spec.json
DELETE libs/core/domain/shared-kernel/mappers
UPDATE tsconfig.base.json

C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>pnpm nx g @nx/workspace:remove --project=core-domain-shared-kernel-ports --files="src/lib/ports.ts,src/lib/ports.spec.ts" --forceRemove

 NX  Generating @nx/workspace:remove

You have passed --forceRemove
DELETE libs/core/domain/shared-kernel/ports/eslint.config.mjs
DELETE libs/core/domain/shared-kernel/ports/jest.config.ts
DELETE libs/core/domain/shared-kernel/ports/project.json
DELETE libs/core/domain/shared-kernel/ports/src/index.ts
DELETE libs/core/domain/shared-kernel/ports/src/lib/logger.port.ts
DELETE libs/core/domain/shared-kernel/ports/src/lib/ports.spec.ts
DELETE libs/core/domain/shared-kernel/ports/src/lib/ports.ts
DELETE libs/core/domain/shared-kernel/ports/src/lib/repository.port.ts
DELETE libs/core/domain/shared-kernel/ports/src/lib
DELETE libs/core/domain/shared-kernel/ports/src
DELETE libs/core/domain/shared-kernel/ports/tsconfig.json
DELETE libs/core/domain/shared-kernel/ports/tsconfig.lib.json
DELETE libs/core/domain/shared-kernel/ports/tsconfig.spec.json
DELETE libs/core/domain/shared-kernel/ports
UPDATE tsconfig.base.json

C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>pnpm nx g @nx/workspace:remove --project=core-domain-shared-kernel-value-objects --files="src/lib/value-objects.ts,src/lib/value-objects.spec.ts" --forceRemove

 NX  Generating @nx/workspace:remove

You have passed --forceRemove
DELETE libs/core/domain/shared-kernel/value-objects/eslint.config.mjs
DELETE libs/core/domain/shared-kernel/value-objects/jest.config.ts
DELETE libs/core/domain/shared-kernel/value-objects/project.json
DELETE libs/core/domain/shared-kernel/value-objects/src/index.ts
DELETE libs/core/domain/shared-kernel/value-objects/src/lib/value-object.base.ts
DELETE libs/core/domain/shared-kernel/value-objects/src/lib/value-objects.spec.ts
DELETE libs/core/domain/shared-kernel/value-objects/src/lib/value-objects.ts
DELETE libs/core/domain/shared-kernel/value-objects/src/lib
DELETE libs/core/domain/shared-kernel/value-objects/src
DELETE libs/core/domain/shared-kernel/value-objects/tsconfig.json
DELETE libs/core/domain/shared-kernel/value-objects/tsconfig.lib.json
DELETE libs/core/domain/shared-kernel/value-objects/tsconfig.spec.json
DELETE libs/core/domain/shared-kernel/value-objects
DELETE libs/core/domain/shared-kernel
DELETE libs/core/domain
DELETE libs/core
UPDATE tsconfig.base.json

C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>pnpm nx g @nx/workspace:remove --project=shared-constants --files="src/lib/constants.ts,src/lib/constants.spec.ts" --forceRemove

 NX  Generating @nx/workspace:remove

You have passed --forceRemove
DELETE libs/shared/constants/eslint.config.mjs
DELETE libs/shared/constants/jest.config.ts
DELETE libs/shared/constants/project.json
DELETE libs/shared/constants/src/index.ts
DELETE libs/shared/constants/src/lib/constants.spec.ts
DELETE libs/shared/constants/src/lib/constants.ts
DELETE libs/shared/constants/src/lib/pagination.constants.ts
DELETE libs/shared/constants/src/lib/regex.constants.ts
DELETE libs/shared/constants/src/lib
DELETE libs/shared/constants/src
DELETE libs/shared/constants/tsconfig.json
DELETE libs/shared/constants/tsconfig.lib.json
DELETE libs/shared/constants/tsconfig.spec.json
DELETE libs/shared/constants
UPDATE tsconfig.base.json

C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>pnpm nx g @nx/workspace:remove --project=shared-errors --files="src/lib/errors.ts,src/lib/errors.spec.ts" --forceRemove

 NX  Generating @nx/workspace:remove

You have passed --forceRemove
DELETE libs/shared/errors/eslint.config.mjs
DELETE libs/shared/errors/jest.config.ts
DELETE libs/shared/errors/project.json
DELETE libs/shared/errors/src/index.ts
DELETE libs/shared/errors/src/lib/errors.spec.ts
DELETE libs/shared/errors/src/lib/errors.ts
DELETE libs/shared/errors/src/lib/exception.base.ts
DELETE libs/shared/errors/src/lib/exception.codes.ts
DELETE libs/shared/errors/src/lib/generic.exceptions.ts
DELETE libs/shared/errors/src/lib
DELETE libs/shared/errors/src
DELETE libs/shared/errors/tsconfig.json
DELETE libs/shared/errors/tsconfig.lib.json
DELETE libs/shared/errors/tsconfig.spec.json
DELETE libs/shared/errors
UPDATE tsconfig.base.json

C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>pnpm nx g @nx/workspace:remove --project=shared-result --files="src/lib/result.ts,src/lib/result.spec.ts" --forceRemove

 NX  Generating @nx/workspace:remove

You have passed --forceRemove
DELETE libs/shared/result/eslint.config.mjs
DELETE libs/shared/result/jest.config.ts
DELETE libs/shared/result/project.json
DELETE libs/shared/result/src/index.ts
DELETE libs/shared/result/src/lib/result.spec.ts
DELETE libs/shared/result/src/lib/result.ts
DELETE libs/shared/result/src/lib/result.type.ts
DELETE libs/shared/result/src/lib/result.utils.ts
DELETE libs/shared/result/src/lib
DELETE libs/shared/result/src
DELETE libs/shared/result/tsconfig.json
DELETE libs/shared/result/tsconfig.lib.json
DELETE libs/shared/result/tsconfig.spec.json
DELETE libs/shared/result
UPDATE tsconfig.base.json

C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>pnpm nx g @nx/workspace:remove --project=shared-types --files="src/lib/types.ts,src/lib/types.spec.ts" --forceRemove

 NX  Generating @nx/workspace:remove

You have passed --forceRemove
DELETE libs/shared/types/eslint.config.mjs
DELETE libs/shared/types/jest.config.ts
DELETE libs/shared/types/project.json
DELETE libs/shared/types/src/index.ts
DELETE libs/shared/types/src/lib/api-response.interface.ts
DELETE libs/shared/types/src/lib/brand.type.ts
DELETE libs/shared/types/src/lib/correlation-id.type.ts
DELETE libs/shared/types/src/lib/maybe.type.ts
DELETE libs/shared/types/src/lib/object-literal.type.ts
DELETE libs/shared/types/src/lib/paginated.interface.ts
DELETE libs/shared/types/src/lib/primitive-types.ts
DELETE libs/shared/types/src/lib/types.spec.ts
DELETE libs/shared/types/src/lib/types.ts
DELETE libs/shared/types/src/lib
DELETE libs/shared/types/src
DELETE libs/shared/types/tsconfig.json
DELETE libs/shared/types/tsconfig.lib.json
DELETE libs/shared/types/tsconfig.spec.json
DELETE libs/shared/types
UPDATE tsconfig.base.json

C:\Users\VAIO\apps\aaa-proyectos-propios\dfs-invest-flow-container\dfs-invest-suite-container\dfs-invest-suite>pnpm nx g @nx/workspace:remove --project=shared-utils --files="src/lib/utils.ts,src/lib/utils.spec.ts" --forceRemove

 NX  Generating @nx/workspace:remove

You have passed --forceRemove
DELETE libs/shared/utils/eslint.config.mjs
DELETE libs/shared/utils/jest.config.ts
DELETE libs/shared/utils/project.json
DELETE libs/shared/utils/src/index.ts
DELETE libs/shared/utils/src/lib/guard.ts
DELETE libs/shared/utils/src/lib/utils.spec.ts
DELETE libs/shared/utils/src/lib/utils.ts
DELETE libs/shared/utils/src/lib/uuid.utils.ts
DELETE libs/shared/utils/src/lib
DELETE libs/shared/utils/src
DELETE libs/shared/utils/tsconfig.json
DELETE libs/shared/utils/tsconfig.lib.json
DELETE libs/shared/utils/tsconfig.spec.json
DELETE libs/shared/utils
UPDATE tsconfig.base.json
